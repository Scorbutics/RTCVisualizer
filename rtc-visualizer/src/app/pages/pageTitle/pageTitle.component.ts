import { Component } from '@angular/core';

import {PageTitleService} from './pageTitle.service';

@Component({
	selector: 'page-title',
	templateUrl: './pageTitle.component.html',
	styleUrls: ['./pageTitle.component.css']
})
export class PageTitleComponent {

    title:string = "RTC";

    constructor(private service: PageTitleService) {
    }

    ngOnInit() {
        this.service.change.subscribe((value) => {
            this.title = value;
        });
    }
}
