import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'rtc-traitement-donnees',
  templateUrl: './traitement-donnees.component.html',
  styleUrls: ['./traitement-donnees.component.css']
})
export class TraitementDonneesComponent implements OnInit {
  constructor(title: Title) {
    title.setTitle('RTC Visualizer - Traitement des données');
  }

  ngOnInit() {}
}
