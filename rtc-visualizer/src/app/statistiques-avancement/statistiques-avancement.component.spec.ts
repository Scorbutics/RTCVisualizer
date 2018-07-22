import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiquesAvancementComponent } from './statistiques-avancement.component';

describe('StatistiquesAvancementComponent', () => {
  let component: StatistiquesAvancementComponent;
  let fixture: ComponentFixture<StatistiquesAvancementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatistiquesAvancementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatistiquesAvancementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
