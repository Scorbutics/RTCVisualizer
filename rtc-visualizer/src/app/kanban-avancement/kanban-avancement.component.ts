import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'rtc-kanban-avancement',
  templateUrl: './kanban-avancement.component.html',
  styleUrls: ['./kanban-avancement.component.css']
})
export class KanbanAvancementComponent implements OnInit {
  constructor(title: Title) {
    title.setTitle('RTC Visualizer - Avancement');
  }

  ngOnInit() {}
}
