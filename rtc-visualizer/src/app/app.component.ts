import { Component, ViewEncapsulation  } from '@angular/core';

@Component({
	selector: 'rtc-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less'],
	encapsulation: ViewEncapsulation.None
})
export class AppComponent {
	title = 'Toto';
}
