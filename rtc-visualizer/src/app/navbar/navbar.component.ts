import { Component, OnInit, ElementRef, HostBinding } from '@angular/core';

@Component({
	selector: 'nav-bar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

	@HostBinding('style.height.px')
	height:number = 70;
	
	collapse:boolean = true;
	
	constructor(private navbarElement:ElementRef) {
	}

	ngOnInit() { 
	}

}
