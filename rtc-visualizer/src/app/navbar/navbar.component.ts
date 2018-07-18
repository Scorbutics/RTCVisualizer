import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
	selector: 'nav-bar',
	templateUrl: './navbar.component.html',
	styleUrls: []
})
export class NavbarComponent implements OnInit {

	height:number;
	collapse:boolean = true;
	
	constructor(private navbarElement:ElementRef) {
	}

	ngOnInit() { 
		this.height = this.navbarElement.nativeElement.offsetHeight - this.navbarElement.nativeElement.offsetTop;
	}

}
