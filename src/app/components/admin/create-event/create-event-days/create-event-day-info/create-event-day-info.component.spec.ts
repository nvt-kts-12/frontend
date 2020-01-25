import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEventDayInfoComponent } from './create-event-day-info.component';

describe('CreateEventDayInfoComponent', () => {
  let component: CreateEventDayInfoComponent;
  let fixture: ComponentFixture<CreateEventDayInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEventDayInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEventDayInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
