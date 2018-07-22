import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'rtc-detail-artefact',
  templateUrl: './detail-artefact.component.html',
  styleUrls: ['./detail-artefact.component.css']
})
export class DetailArtefactComponent implements OnInit {
  constructor(title: Title) {
    title.setTitle('RTC Visualizer - Détail artefact');
  }

  ngOnInit() {}
}
