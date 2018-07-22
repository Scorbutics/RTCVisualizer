import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanAvancementComponent } from './kanban-avancement.component';

describe('KanbanAvancementComponent', () => {
  let component: KanbanAvancementComponent;
  let fixture: ComponentFixture<KanbanAvancementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KanbanAvancementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KanbanAvancementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
