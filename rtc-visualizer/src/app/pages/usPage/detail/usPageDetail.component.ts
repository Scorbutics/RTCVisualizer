import { Component, OnInit  } from '@angular/core';
import { Observable } from 'rxjs';
import { WorkItem } from '../logindata.model';
import { PageTitleService } from '../../pageTitle/pageTitle.service';

@Component({
	selector: 'us-page-detail',
	templateUrl: './usPageDetail.component.html',
	styleUrls: ['./usPageDetail.component.less']
})
export class UsPageDetailComponent implements OnInit {
	
	ngOnInit(): void {
		this.pageTitleService.changeTitle(this.usName);
	}
	private usName:string = "US Mise en place du top déploiement";

	constructor(private pageTitleService: PageTitleService) { }
}
