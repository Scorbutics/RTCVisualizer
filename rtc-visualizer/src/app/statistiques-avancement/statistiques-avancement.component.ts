import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'rtc-statistiques-avancement',
  templateUrl: './statistiques-avancement.component.html',
  styleUrls: ['./statistiques-avancement.component.css']
})
export class StatistiquesAvancementComponent implements OnInit {
  constructor(title: Title) {
    title.setTitle('RTC Visualizer - Statistiques');
  }

  ngOnInit() {}
}
