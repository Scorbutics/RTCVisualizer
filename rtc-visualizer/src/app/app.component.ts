import { Component, ViewEncapsulation, OnInit  } from '@angular/core';
import { RtcService } from './pages/usPage/service/rtc.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
	selector: 'rtc-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less'],
	encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

	constructor(private rtcService: RtcService, private route: ActivatedRoute) {}

	ngOnInit() {

	}
}
