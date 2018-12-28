import { Component, OnInit  } from '@angular/core';
import { RtcService } from './service/rtc.service';
import { Observable } from 'rxjs';
import { UsItem } from './logindata.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
@Component({
	selector: 'us-page',
	templateUrl: './usPage.component.html',
	styleUrls: ['./usPage.component.less']
})
export class UsPageComponent implements OnInit {
	
	usSprint: Observable<UsItem[]>;
	iterations: Observable<any[]>;

	private static ClassStateMap = [
		"card-ready",
		"card-dev",
		"card-test",
		"card-done"
	];

	ngOnInit(): void {


		this.iterations = this.route.paramMap.pipe(
			switchMap((pathParams: ParamMap) => {
				const id = pathParams.get("iterationid"); 
				return !id ? [] : this.rtcService.getChildrenIterations(id).pipe(map((value: any) => {
					if(!value.data || !value.data.foundation || !value.data.foundation || !value.data.foundation.iteration || value.data.foundation.iteration.length == 0) {
						return [id];
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
					return Object.values(result);
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

	getClassFromUsState(state: number): string {
		return UsPageComponent.ClassStateMap[state];
	}
}
