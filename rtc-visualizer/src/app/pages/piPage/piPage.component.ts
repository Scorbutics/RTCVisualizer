import { Component, Inject  } from '@angular/core';
import { PageTitleService } from '../pageTitle/pageTitle.service';

@Component({
	selector: 'pi-page',
	templateUrl: './piPage.component.html',
	styleUrls: ['./piPage.component.css']
})
export class PiPageComponent {
	private piName:string = "PI Eté";

	constructor(private pageTitleService: PageTitleService) { 
		pageTitleService.changeTitle(this.piName);
	}
	
}
