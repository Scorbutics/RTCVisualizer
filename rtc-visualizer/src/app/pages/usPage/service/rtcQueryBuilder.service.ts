import { Injectable } from '@angular/core';

class RtcQueryExpressionBuilder {
    private static ValueSeparator = {
        string: "'"
    };
    
    constructor(private build: string, private valid = true) {}
    
    criteria(key: string, operator: string, value: any): RtcQueryFilterBuilder {
        if(this.valid) {
            const separator = RtcQueryExpressionBuilder.ValueSeparator[typeof value] == undefined ? "" : RtcQueryExpressionBuilder.ValueSeparator[typeof value];
            this.build += key + operator + separator + value + separator;
        }
        return new RtcQueryFilterBuilder(this);
    }

    stealContent(): string {
        let output = this.build;
        this.build = "";
        return output;
    }
}

class RtcQueryFilterBuilder {
    private build: string = "";
    private valid = true;

    constructor(key: RtcQueryExpressionBuilder) {
        this.build = key.stealContent();
    }

    private append(rawValue: string) {
        const wasValid = this.valid;
        if(wasValid) {
            this.build += rawValue;
        }
        this.valid = true;
        return new RtcQueryExpressionBuilder(this.build, wasValid);
    }

    get and(): RtcQueryExpressionBuilder {
        return this.append(" and ");
    }

    get or(): RtcQueryExpressionBuilder {
        return this.append(" or ");
    }

    maybe(condition: boolean): RtcQueryFilterBuilder {
        this.valid = condition;
        return this;
    }

    stealContent(): string {
        let output = this.build;
        this.build = "";
        return output;
    }
}

enum RtcQueryState {
    Value,
    Resource
}

enum RtcQueryValueState {
    Unique,
    Multiple
}

class RtcQueryBuilder {
    private static FilterPartSeparatorStart = "[";
    private static FilterPartSeparatorEnd = "]";

    private static MultipleValuesPartSeparatorStart = "(";
    private static MultipleValuesPartSeparatorMiddle = "|";
    private static MultipleValuesPartSeparatorEnd = ")";

    private static ResourceSeparator = "/";

    private build: string;
    private valueBuild: string = "";
    private state = RtcQueryState.Resource;
    private multipleValuesTrigger = RtcQueryValueState.Unique;

    constructor(baseResource: string) {
        var lastChar = baseResource.length > 0 ? baseResource[baseResource.length - 1] : "";
        if(lastChar != RtcQueryBuilder.ResourceSeparator) {
            baseResource += RtcQueryBuilder.ResourceSeparator;
        }
        this.build = baseResource;
    }

    private toValueState(isFirstValue: boolean) {
        if(!isFirstValue && this.multipleValuesTrigger != RtcQueryValueState.Multiple) {
            this.valueBuild = RtcQueryBuilder.MultipleValuesPartSeparatorStart + this.valueBuild;
            this.multipleValuesTrigger = RtcQueryValueState.Multiple;
        }
        this.state = RtcQueryState.Value;
    }

    private toResourceState() {
        this.build += this.valueBuild;
        this.valueBuild = "";
        if(this.state == RtcQueryState.Value && this.multipleValuesTrigger == RtcQueryValueState.Multiple) {
            this.build += RtcQueryBuilder.MultipleValuesPartSeparatorEnd;
        }
        this.multipleValuesTrigger = RtcQueryValueState.Unique;
        this.state = RtcQueryState.Resource;
    }

    private append(rawValue: string): RtcQueryBuilder {
        const isFirstValue = this.valueBuild.length == 0; 
        this.toValueState(isFirstValue);
        this.valueBuild += (isFirstValue ? "" : RtcQueryBuilder.MultipleValuesPartSeparatorMiddle) + rawValue;
        return this;
    }

    value(value: string, expression?: RtcQueryFilterBuilder): RtcQueryBuilder {
        const contentExpression = expression != undefined ? expression.stealContent() : "";
        return this.append(value + 
            (contentExpression.length != 0 ? RtcQueryBuilder.FilterPartSeparatorStart + contentExpression + RtcQueryBuilder.FilterPartSeparatorEnd : ""));
    }

    sub(value: RtcQueryBuilder): RtcQueryBuilder {
        return this.append(value.stealContent());
    }

    resource(resource: string): RtcQueryBuilder {
        this.toResourceState();
        this.build += RtcQueryBuilder.ResourceSeparator + resource;
        return this;
    }

    stealContent(): string {
        this.toResourceState();
        let output = this.build;
        this.build = "";
        return output;
    }
}


@Injectable()
export class RtcQueryBuilderService {
    
    query(baseResource: string): RtcQueryBuilder {
        return new RtcQueryBuilder(baseResource);
    }
    
    expression(): RtcQueryExpressionBuilder {
        return new RtcQueryExpressionBuilder("");
    }

}
