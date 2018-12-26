

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from } from 'rxjs';
import { LoginService } from './login.service';
import { RtcQueryBuilderService } from './rtcQueryBuilder.service';
 
let httpOptions = {
    headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin' : '*',
        'Accept' : '*/*',
        'Accept-Language' : 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7'
    })
};
 
@Injectable()
export class UsService {
 
    constructor(private http:HttpClient, private loginService: LoginService, private builder: RtcQueryBuilderService) {}
 
    //TODO http request interceptor for base URL
    private host = "http://localhost:1337";
    private root = "/api/";

    private hostTarget = "https://ccm001-jazzx.sii24.pole-emploi.intra:9443/ccm";
    private rootTarget = "/rpt/repository/";

    getAllUs(team: string, sprint?: string, state?: string) {
       const finalURL = this.hostTarget + this.rootTarget + 
        'workitem?fields='+ this.builder.query("workitem")
            .value("workItem", 
                this.builder.expression()
                .criteria("type/id", "=", "com.ibm.team.apt.workItemType.story")
                .maybe(state != null && state.length > 0)
                .and.criteria("state/id", "=", "com.ibm.team.apt.storyWorkflow.state." + state)
                .and.criteria("projectArea/name", "=", team)
                .maybe(sprint != null && sprint.length > 0)
                .and.criteria("target/name", "=", "Sprint " + sprint)
            )
            .resource("")
            .value("id")
            .value("summary")
            .value("state/id")
            .stealContent() + '&size=5000';
        
        return this.http.post(this.host + this.root, {
            url : finalURL
        });
    }
}


