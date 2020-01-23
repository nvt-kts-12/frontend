import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorPopupComponent } from './sector-popup.component';

describe('SectorPopupComponent', () => {
  let component: SectorPopupComponent;
  let fixture: ComponentFixture<SectorPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectorPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectorPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
