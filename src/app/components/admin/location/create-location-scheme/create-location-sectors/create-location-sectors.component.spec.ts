import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLocationSectorsComponent } from './create-location-sectors.component';

describe('CreateLocationSectorsComponent', () => {
  let component: CreateLocationSectorsComponent;
  let fixture: ComponentFixture<CreateLocationSectorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLocationSectorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLocationSectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
