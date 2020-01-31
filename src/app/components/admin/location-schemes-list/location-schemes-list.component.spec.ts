import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationSchemesListComponent } from './location-schemes-list.component';

describe('LocationSchemesListComponent', () => {
  let component: LocationSchemesListComponent;
  let fixture: ComponentFixture<LocationSchemesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationSchemesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationSchemesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
