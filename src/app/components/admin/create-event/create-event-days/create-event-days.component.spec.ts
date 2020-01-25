import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEventDaysComponent } from './create-event-days.component';

describe('CreateEventDaysComponent', () => {
  let component: CreateEventDaysComponent;
  let fixture: ComponentFixture<CreateEventDaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEventDaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEventDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
