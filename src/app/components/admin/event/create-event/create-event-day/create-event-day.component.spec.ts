import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEventDayComponent } from './create-event-day.component';

describe('CreateEventDayComponent', () => {
  let component: CreateEventDayComponent;
  let fixture: ComponentFixture<CreateEventDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEventDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEventDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
