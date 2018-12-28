

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { RtcQueryBuilderService } from './rtcQueryBuilder.service';
import { WorkItem, ItemStateMap, UsItem } from '../logindata.model';
import { map } from 'rxjs/operators';
 
interface WorkItemContainerRoot {
    data : { workitem: { workItem: Array<WorkItem>} }
}

@Injectable()
export class RtcService {
 
    constructor(private http:HttpClient, private loginService: LoginService, private builder: RtcQueryBuilderService) {}
 
    //TODO http request interceptor for base URL
    private host = "http://localhost:1337";
    private root = "/api/";

    private hostTarget = "https://ccm001-jazzx.sii24.pole-emploi.intra:9443/ccm";
    private rootTarget = "/rpt/repository/";

    getTeamArea(team?: string) {
        return this.builder.query(this.hostTarget + this.rootTarget + 'foundation?fields='+ "teamArea")
             .valueSub(this.builder.query("teamArea", this.builder.expression().maybe(team != undefined).criteria("name", "=", team))
                .value("name", "qualifiedName", "teamMembers/name", "projectArea", "parentTeamArea/name")
             ).parameter("size", 1000)
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

    getAllUs(project: string, sprint: string, team?: string, state?: string): Observable<UsItem[]> {
        const observableUsRequest = this.builder.query(
                this.hostTarget + this.rootTarget + "workitem?fields=workitem/workItem", 
                this.builder.expression()
                    .criteria("type/id", "=", "com.ibm.team.apt.workItemType.story")
                    .maybe(state != null && state.length > 0)
                    .and.criteria("state/id", "=", "com.ibm.team.apt.storyWorkflow.state." + state)
                    .and.criteria("projectArea/name", "=", project)
                    .and.criteria("target/name", "=", "Sprint " + sprint)
                )
                .value("id", "summary", "state/id", "category/name", "teamArea/name")
                .valueSub(this.builder.query("parent").value("id", "summary"))
                .valueSub(this.builder.query("allExtensions", this.builder.expression()
                        .criteria("key", "=", "com.ibm.team.workitem.attribute.storyPointsNumeric")
                        .or.criteria("key", "=", "com.ibm.team.workitem.attribute.safeWorkType"))
                    .value("key", "displayValue")
                )
            .parameter("size", 5000)
            .send<WorkItemContainerRoot>("post", this.host + this.root);

        return observableUsRequest.pipe(map((value, index) => { 
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


