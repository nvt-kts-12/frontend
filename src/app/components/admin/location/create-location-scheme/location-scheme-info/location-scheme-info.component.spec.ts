import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationSchemeInfoComponent } from './location-scheme-info.component';

describe('LocationSchemeInfoComponent', () => {
  let component: LocationSchemeInfoComponent;
  let fixture: ComponentFixture<LocationSchemeInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationSchemeInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationSchemeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
