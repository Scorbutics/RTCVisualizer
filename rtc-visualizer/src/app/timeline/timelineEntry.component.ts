import { Component, HostBinding} from '@angular/core';

@Component({
    selector: 'timeline-entry',
	templateUrl: './timelineEntry.component.html',
	styleUrls: ['./timelineEntry.component.less']
})
export class TimelineEntryComponent {
    @HostBinding('class.container') 
    private containerClass: boolean = true;

    @HostBinding('class.right') 
    private rightClass: boolean = true;

    private date:string = "99 septembre";
    private text:string = "Lorem ipsum sdfljlsdf jfjuuf usufu iuoisydf ?... fsdiufy uizeyfius ttfsdf ! sdfy iusdfs dfsf eezrzer errr. sdfj, re ?";

}
