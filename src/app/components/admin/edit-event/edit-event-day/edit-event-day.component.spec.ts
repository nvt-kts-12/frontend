import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEventDayComponent } from './edit-event-day.component';

describe('EditEventDayComponent', () => {
  let component: EditEventDayComponent;
  let fixture: ComponentFixture<EditEventDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEventDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEventDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
