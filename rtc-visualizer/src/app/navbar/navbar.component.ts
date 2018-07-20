import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
	selector: 'nav-bar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

	height:number = 70;
	collapse:boolean = true;
	
	constructor(private navbarElement:ElementRef) {
	}

	ngOnInit() { 
	}

}
