import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDaysComponent } from './event-days.component';

describe('EventDaysComponent', () => {
  let component: EventDaysComponent;
  let fixture: ComponentFixture<EventDaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventDaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
