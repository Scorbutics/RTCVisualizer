import { Component, Input } from '@angular/core';

@Component({
	selector: 'named-block',
	templateUrl: './namedBlock.component.html',
	styleUrls: ['./namedBlock.component.less']
})
export class NamedBlockComponent {
	@Input()
	name:string = "Tâches";
}
