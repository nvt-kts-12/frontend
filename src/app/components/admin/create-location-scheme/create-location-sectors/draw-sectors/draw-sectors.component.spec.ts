import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawSectorsComponent } from './draw-sectors.component';

describe('DrawSectorsComponent', () => {
  let component: DrawSectorsComponent;
  let fixture: ComponentFixture<DrawSectorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawSectorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawSectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
