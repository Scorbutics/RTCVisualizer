import { Component  } from '@angular/core';
import { PageTitleService } from '../pageTitle/pageTitle.service';

@Component({
	selector: 'us-page',
	templateUrl: './usPage.component.html',
	styleUrls: ['./usPage.component.css']
})
export class UsPageComponent {
	private usName:string = "US Mise en place du top déploiement";

	constructor(private pageTitleService: PageTitleService) { 
		pageTitleService.changeTitle(this.usName);
	}
}
