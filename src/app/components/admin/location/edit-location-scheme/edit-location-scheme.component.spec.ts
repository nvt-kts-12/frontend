import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLocationSchemeComponent } from './edit-location-scheme.component';

describe('EditLocationSchemeComponent', () => {
  let component: EditLocationSchemeComponent;
  let fixture: ComponentFixture<EditLocationSchemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLocationSchemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLocationSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
