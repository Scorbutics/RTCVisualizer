import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

class RtcQueryExpressionBuilder {
    private static ValueSeparator = {
        string: "'"
    };
    
    constructor(private build: string, private valid = true) {}
    
    criteria(key: string, operator: string, value: any): RtcQueryFilterBuilder {
        if(this.valid && key != null && operator != null && value != null) {
            const separator = RtcQueryExpressionBuilder.ValueSeparator[typeof value] == undefined ? "" : RtcQueryExpressionBuilder.ValueSeparator[typeof value];
            this.build += key + operator + separator + encodeURIComponent(value) + separator;
        }
        return new RtcQueryFilterBuilder(this);
    }

    maybe(condition: boolean): RtcQueryExpressionBuilder {
        this.valid = condition;
        return this;
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

    private static ParameterSeparator = "&";
    private static ParameterKeyValueSeparator = "=";

    private buildStr: string = "";
    private valueBuild: string = "";
    private state = RtcQueryState.Resource;
    private multipleValuesTrigger = RtcQueryValueState.Unique;

    constructor(private http: HttpClient, baseResource: string, expression?: RtcQueryFilterBuilder) {
        const contentExpression = expression != undefined ? expression.stealContent() : "";
        this.append(baseResource + 
            (contentExpression.length != 0 ? RtcQueryBuilder.FilterPartSeparatorStart + contentExpression + RtcQueryBuilder.FilterPartSeparatorEnd : ""));
        this.valueBuild += RtcQueryBuilder.ResourceSeparator;
        this.toResourceState();
    }

    private toValueState(isFirstValue: boolean) {
        if(!isFirstValue && this.multipleValuesTrigger != RtcQueryValueState.Multiple) {
            this.valueBuild = RtcQueryBuilder.MultipleValuesPartSeparatorStart + this.valueBuild;
            this.multipleValuesTrigger = RtcQueryValueState.Multiple;
        }
        this.state = RtcQueryState.Value;
    }

    private toResourceState() {
        this.buildStr += this.valueBuild;
        this.valueBuild = "";
        if(this.state == RtcQueryState.Value && this.multipleValuesTrigger == RtcQueryValueState.Multiple) {
            this.buildStr += RtcQueryBuilder.MultipleValuesPartSeparatorEnd;
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

    value(...value: string[]): RtcQueryBuilder {
        value.forEach((val) => this.append(val));
        return this;
    }

    valueSub(value: RtcQueryBuilder): RtcQueryBuilder {
        return this.append(value.build());
    }

    parameter(key: string, value: any): RtcQueryBuilder {
        this.toResourceState();
        this.buildStr += RtcQueryBuilder.ParameterSeparator + key + RtcQueryBuilder.ParameterKeyValueSeparator + encodeURIComponent(value + "");
        return this;
    }

    send<T> (method: string, url: string, options?: {
        body?: any;
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe?: 'body';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        responseType?: 'json';
        reportProgress?: boolean;
        withCredentials?: boolean;
    }): Observable<T> {
        const output = this.build();
        options = options || {};
        options.body = options.body || {};
        options.body["url"] = output;
        return this.http.request<T>(method, url, options);
    }

    private build() {
        this.toResourceState();
        let output = this.buildStr;
        this.buildStr = "";
        return output;
    }
}


@Injectable()
export class RtcQueryBuilderService {
    
    constructor(private http: HttpClient) {}

    query(baseResource: string, expression?: RtcQueryFilterBuilder): RtcQueryBuilder {
        return new RtcQueryBuilder(this.http, baseResource, expression);
    }
    
    expression(): RtcQueryExpressionBuilder {
        return new RtcQueryExpressionBuilder("");
    }

}
