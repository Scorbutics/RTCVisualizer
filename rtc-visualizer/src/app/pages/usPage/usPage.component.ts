import { Component, OnInit  } from '@angular/core';
import { RtcService } from './service/rtc.service';
import { Observable } from 'rxjs';
import { UsItem } from './logindata.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
@Component({
	selector: 'us-page',
	templateUrl: './usPage.component.html',
	styleUrls: ['./usPage.component.less']
})
export class UsPageComponent implements OnInit {
	
	usSprint: Observable<UsItem[]>;
	
	private static ClassStateMap = [
		"card-ready",
		"card-dev",
		"card-test",
		"card-done"
	];

	ngOnInit(): void {
		this.usSprint = this.route.paramMap.pipe(
			switchMap((pathParams: ParamMap) =>
				this.route.queryParamMap.pipe(switchMap((queryParams: ParamMap) =>
				this.rtcService.getAllUs('D2IA - Delivery', pathParams.get('iterationid'), queryParams.get('team'))
		))));
	}

	constructor(private rtcService: RtcService, private route: ActivatedRoute) { }

	getClassFromUsState(state: number): string {
		return UsPageComponent.ClassStateMap[state];
	}
}
