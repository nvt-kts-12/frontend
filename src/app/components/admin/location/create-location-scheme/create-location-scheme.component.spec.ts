import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLocationSchemeComponent } from './create-location-scheme.component';

describe('CreateLocationSchemeComponent', () => {
  let component: CreateLocationSchemeComponent;
  let fixture: ComponentFixture<CreateLocationSchemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLocationSchemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLocationSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
