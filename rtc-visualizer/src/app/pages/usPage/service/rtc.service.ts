

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
        const finalURL = this.hostTarget + this.rootTarget + 
         'foundation?fields='+ this.builder.query("teamArea")
             .value("teamArea", this.builder.expression().maybe(team != undefined).criteria("name", "=", team))
             .resource()
             .value("name")
             .value("qualifiedName")
             .value("teamMembers/name")
             .value("projectArea")
             .value("parentTeamArea/name")
             .build() + '&size=1000';
         
         return this.http.post(this.host + this.root, {
             url : finalURL
         });
     }

     getAllCategories() {
        const finalURL = this.hostTarget + this.rootTarget + 
         'workitem?fields='+ this.builder.query("workitem")
             .value("category")
             .resource()
             .value("id")
             .value("name")
             .value("qualifiedName")
             .build() + '&size=1000';
         
         return this.http.post(this.host + this.root, {
             url : finalURL
         });
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
       const finalURL = this.hostTarget + this.rootTarget + 
        'workitem?fields='+ this.builder.query("workitem")
            .value("workItem", 
                this.builder.expression()
                .criteria("type/id", "=", "com.ibm.team.apt.workItemType.story")
                .maybe(state != null && state.length > 0)
                .and.criteria("state/id", "=", "com.ibm.team.apt.storyWorkflow.state." + state)
                .and.criteria("projectArea/name", "=", project)
                .and.criteria("target/name", "=", "Sprint " + sprint)
            )
            .resource()
            .value("id")
            .value("summary")
            .value("state/id")
            .value("category/name")
            .value("teamArea/name")
            .sub(this.builder.query("parent").value("id").value("summary"))
            .sub(this.builder.query("")
                .value("allExtensions", this.builder.expression()
                .criteria("key", "=", "com.ibm.team.workitem.attribute.storyPointsNumeric")
                .or.criteria("key", "=", "com.ibm.team.workitem.attribute.safeWorkType"))
                .resource()
                .value("key")
                .value("displayValue"))
            .build() + '&size=5000';
        const observableUsRequest = (<Observable<WorkItemContainerRoot>> this.http.post(this.host + this.root, {
            url : finalURL
        }));
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


