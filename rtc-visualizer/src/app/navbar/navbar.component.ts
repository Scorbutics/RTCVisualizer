import { Component, OnInit, ElementRef, HostBinding } from '@angular/core';

@Component({
	selector: 'nav-bar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {

	constructor(private navbarElement:ElementRef) {
	}

	ngOnInit() { 
	}

}
