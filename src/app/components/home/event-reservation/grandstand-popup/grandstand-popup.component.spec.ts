import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrandstandPopupComponent } from './grandstand-popup.component';

describe('GrandstandPopupComponent', () => {
  let component: GrandstandPopupComponent;
  let fixture: ComponentFixture<GrandstandPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrandstandPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrandstandPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
