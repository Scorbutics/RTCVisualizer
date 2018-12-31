

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UsItem } from './us.model';
import { map } from 'rxjs/operators';
import { RtcQueryService } from 'rtcquery-api';
import { WorkItem, ItemStateMap } from '../models/workitem.model';
 
interface WorkItemContainerRoot {
    data : { workitem: { workItem: Array<WorkItem>} }
}

@Injectable()
export class RtcService {
 
    constructor(private builder: RtcQueryService) {}
 
    //TODO http request interceptor for base URL
    private host = "http://localhost:1337";
    private root = "/api/";

    private hostTarget = "https://ccm001-jazzx.sii24.pole-emploi.intra:9443/ccm";
    private rootTarget = "/rpt/repository/";

    getTeamArea(team?: string) {
        return this.builder.query(this.hostTarget + this.rootTarget + 'foundation?fields=teamArea/teamArea', 
            this.builder.expression().maybe(team != undefined).criteria("name", "=", team))
            .value("name", "qualifiedName", "teamMembers/name", "projectArea", "parentTeamArea/name")
            .parameter("size", 1000)
        .send("post", this.host + this.root);
     }

     getChildrenIterations(parent: string) {
        return this.builder.query(this.hostTarget + this.rootTarget + "foundation?fields=iteration/iteration", 
            this.builder.expression().criteria("name", "=", parent).and.criteria("archived", "=", "false"))
            .valueSub(this.builder.query("children", this.builder.expression().criteria("archived", "=", "false")).value("name", "id", "startDate", "endDate"))
            .parameter("size", 1000)
        .send("post", this.host + this.root);
     }

     private formatCategoryName(categoryName: string) {
        if(categoryName == undefined) {
            return "";
        }

        const splitDash = categoryName.split('-');
        if(splitDash.length != 0) {
            return splitDash[0];
        }

        const splitSpace = categoryName.split('-');
        if(splitSpace.length != 0) {
            return splitSpace[0];
        }
        return categoryName;
     }

    getAllUs(project: string, iterations: any[], team?: string, state?: string): Observable<UsItem[]> {
        if(iterations.length == 0) {
            return new Observable<UsItem[]>();
        }
        
        const allExtensionsValue = 
        this.builder.query("allExtensions", this.builder.expression()
            .criteria("key", "=", "com.ibm.team.workitem.attribute.storyPointsNumeric")
            .or.criteria("key", "=", "com.ibm.team.workitem.attribute.safeWorkType"))
        .value("key", "displayValue");

        let iterationExpression = this.builder.expression().criteria("target/name", "=", iterations[0].name);
        iterations.forEach((value, index) => {
            if(index > 0) {
                iterationExpression = iterationExpression.or.criteria("target/name", "=", value.name)
            }
        });

        let usConditionExpression = this.builder.expression()
        .criteria("type/id", "=", "com.ibm.team.apt.workItemType.story")
        .maybe(state != null && state.length > 0)
        .and.criteria("state/id", "=", "com.ibm.team.apt.storyWorkflow.state." + state)
        .and.criteria("projectArea/name", "=", project)
        .and.group(iterationExpression);

        const observableUsRequest = this.builder.query(
                this.hostTarget + this.rootTarget + "workitem?fields=workitem/workItem", usConditionExpression)
                .value("id", "summary", "state/id", "category/name", "teamArea/name")
                //.valueSub(this.builder.query("parent").value("id", "summary"))
                .valueSub(allExtensionsValue)
            .parameter("size", 5000)
            .send<WorkItemContainerRoot>("post", this.host + this.root);

        return observableUsRequest.pipe(map((value: any, index) => { 
            if(value.data.workitem.workItem == undefined) {
                return [];
            }
            let result = team != null ? value.data.workitem.workItem.filter(data => data && data.teamArea && data.teamArea.name == team) : value.data.workitem.workItem;
            return result.map(value => {
                return {
                    state: (value.state ? ItemStateMap.map[value.state.id] : undefined),
                    target: value.target,
                    teamArea: value.teamArea,
                    category: (value.category ? {name : this.formatCategoryName(value.category.name)} : undefined),
                    id: value.id,
                    summary: value.summary,
                    type : value.allExtensions[1].displayValue == "Business" ? "US" : "TS"
                };
            });
        }));
    }
}


