import { Injectable, Output, EventEmitter } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable()
export class PageTitleService {
  constructor(private titleService: Title ) {}

  @Output() 
  change: EventEmitter<string> = new EventEmitter();

  private title_:string = "RTC";

  changeTitle(title:string) {
      this.title_ = title;
      this.titleService.setTitle(this.title_);
      this.change.emit(this.title_);
  }

}
