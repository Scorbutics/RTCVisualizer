import { Component, Input, HostBinding } from '@angular/core';

@Component({
	selector: 'card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.less']
})
export class CardComponent {
    @Input()
    title:string = "";

    @HostBinding('style.background-color')
    @Input()
    color:string = "#eeeeee";
}
