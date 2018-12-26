import { Component  } from '@angular/core';
import { PageTitleService } from '../pageTitle/pageTitle.service';
import { UsService } from './service/us.service';
import { LoginService } from './service/login.service';

@Component({
	selector: 'us-page',
	templateUrl: './usPage.component.html',
	styleUrls: ['./usPage.component.less']
})
export class UsPageComponent {
	private usName:string = "US Mise en place du top déploiement";

	constructor(private pageTitleService: PageTitleService, private usService:UsService, private loginService:LoginService) { 
		pageTitleService.changeTitle(this.usName);
		loginService.login("guest", "guest").subscribe(
			data => {
				//console.log(data.cookie);
				usService.getAllUs('D2IA%20-%20Delivery', "19A01").subscribe(
					data => {
						console.log(data);
					}
				);
			}
		);
		
	}
}
