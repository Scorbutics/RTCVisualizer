import { Component  } from '@angular/core';
import { PageTitleService } from '../pageTitle/pageTitle.service';
import { UsService } from './service/us.service';

@Component({
	selector: 'us-page',
	templateUrl: './usPage.component.html',
	styleUrls: ['./usPage.component.less']
})
export class UsPageComponent {
	private usName:string = "US Mise en place du top déploiement";

	constructor(private pageTitleService: PageTitleService, private usService:UsService) { 
		pageTitleService.changeTitle(this.usName);
		usService.getAllUs('fab team2Choc', [9]).subscribe(
			data => {
				console.log(data);
			}
		);
	}
}
