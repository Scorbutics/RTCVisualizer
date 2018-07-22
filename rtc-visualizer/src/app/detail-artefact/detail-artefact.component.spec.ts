import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailArtefactComponent } from './detail-artefact.component';

describe('DetailArtefactComponent', () => {
  let component: DetailArtefactComponent;
  let fixture: ComponentFixture<DetailArtefactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailArtefactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailArtefactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
