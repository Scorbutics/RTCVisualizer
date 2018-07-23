import { Component, HostBinding } from '@angular/core';

@Component({
	selector: 'card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.less']
})
export class CardComponent {
    private text:string = "Best ugg boots on the planet. Free shipping, 24/7 customer service.";
    private title:string = "";


    @HostBinding('class.itemCard')
    private itemCardClass:boolean = true;


}
