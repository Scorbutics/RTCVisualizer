import { Component, OnInit  } from '@angular/core';
import { RtcService } from './rtc.service';
import { Observable } from 'rxjs';
import { UsItem } from './us.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { ItemState, ItemStateMap, Iteration } from '../models/workitem.model';


@Component({
	selector: 'us-page',
	templateUrl: './usPage.component.html',
	styleUrls: ['./usPage.component.scss']
})
export class UsPageComponent implements OnInit {
	groupFilter: string = "state";
	sortFilter: string = "state";
	
	usSprint: Observable<UsItem[]>;
	iterations: Observable<Iteration[]>;

	private static ClassStateMap = [
		"card-ready",
		"card-dev",
		"card-test",
		"card-done"
	];

	private static ClassTypeMap = {
		"US" : "card-us",
		"TS" : "card-ts"
	};

	ngOnInit(): void {
		this.iterations = this.route.paramMap.pipe(
			switchMap((pathParams: ParamMap) => {
				const id = pathParams.get("iterationid"); 
				return !id ? [] : this.rtcService.getChildrenIterations(id).pipe(map((value: any) => {
					if(!value.data || !value.data.foundation || !value.data.foundation || !value.data.foundation.iteration || value.data.foundation.iteration.length == 0) {
						return [{name : id}];
					}

					const result = (<any[]> value.data.foundation.iteration).reduce((accu, currentValue, index, array) => {
						if(currentValue.children) {
							currentValue.children.forEach(currentValue => {
								if(currentValue != undefined && accu && accu[currentValue.name] == undefined) {
									accu[currentValue.name] = currentValue;
								}
							});
						}
						return accu;
					}, {});
					const arrayResult = Object.values(result);
					return arrayResult.length == 0 ? [{name : id}] : arrayResult;
				}));
			}
		));

		this.usSprint = this.iterations.pipe(switchMap((it) => 
			this.route.queryParamMap.pipe(switchMap((queryParams: ParamMap) => {
				return this.rtcService.getAllUs('D2IA - Delivery', it, queryParams.get('team'));
			}
		))));
	}

	constructor(private rtcService: RtcService, private route: ActivatedRoute) { }

	getGroup(usGroup: any) {
		if(this.groupFilter == "state") {
			return ItemStateMap.reversemap[parseInt(usGroup.key)];
		}
		return usGroup.key;
	}

	getClassFromUsState(state: number): string {
		return UsPageComponent.ClassStateMap[state];
	}
	
	getClassFromStoryType(storyType: string): string {
		return UsPageComponent.ClassTypeMap[storyType];
	}
}
