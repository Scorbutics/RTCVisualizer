import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraitementDonneesComponent } from './traitement-donnees.component';

describe('TraitementDonneesComponent', () => {
  let component: TraitementDonneesComponent;
  let fixture: ComponentFixture<TraitementDonneesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraitementDonneesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraitementDonneesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
