import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParterPopupComponent } from './parter-popup.component';

describe('PopupDialogComponent', () => {
  let component: ParterPopupComponent;
  let fixture: ComponentFixture<ParterPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParterPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParterPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
