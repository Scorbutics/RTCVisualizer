

import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

 
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
@Injectable()
export class UsService {
 
    constructor(private http:HttpClient) {}
 
    //TODO http request interceptor for base URL
    private host = "";

    private root = "/ccm/rpt/repository/";

    private buildFilterRequest(filterMap:Map<string, string>) : string {
        let result = "";
        const separator = "=";
        const valueEnglober = '"';
        filterMap.forEach((value, key) => { 
            result += key + separator + valueEnglober + value + valueEnglober + " and ";
        });
        return '[' + result.substr(0, result.length - " and ".length) + ']';
    }

    getAllUs(team:string, sprints:number[])  {
        if(team == null || sprints == null || sprints.length == 0) {
            return null;
        }

        //TODO un querybuilder RTC (c'est + sexy et flexible qu'une simple Map)
        //Ex : query.filter(key, value).and.filter(key2, value2).or.filter(key3, value3) ...
        const filterMap = new Map<string, string>();
        filterMap.set('type/id', 'com.ibm.team.apt.workItemType.story');
        filterMap.set('team', team);
        filterMap.set('state/name', 'New');
        const finalURL = 'workitem?fields=workitem/workItem'+ this.buildFilterRequest(filterMap);
        console.log(finalURL);
        return this.http.get(finalURL);
    }
}

