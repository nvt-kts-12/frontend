import 'zone.js/dist/zone-testing'
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { EditEventComponent } from './edit-event.component';
import { CoreModulesModule } from 'src/app/shared/components/core.module';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/shared/services/event/event.service';
import { EditEventDayComponent } from './edit-event-day/edit-event-day.component';
import { of } from 'rxjs';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';

describe('EditEventComponent', () => {
  let component: EditEventComponent;
  let fixture: ComponentFixture<EditEventComponent>;
  let eventService: any;
  let route: any;
  let router: any;

  beforeAll(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule,
                                platformBrowserDynamicTesting());
  })

  beforeEach(() => {
    let routerMock = {
      navigate: jasmine.createSpy('navigate')
    }

    let eventServiceMock = {
      updateEvent: jasmine.createSpy('updateEvent'),
      getEventDays: jasmine.createSpy('getEventDays').and.returnValue(of([
        {
            "id": 2,
            "event": {
                "id": 2,
                "description": "Opis",
                "name": "Koncert Zdravka Colicaa",
                "category": "CULTURAL",
                "dateAndLocationDTO": null
            },
            "date": "2020-02-17",
            "reservationExpireDate": "2020-02-15",
            "eventDayState": "ONLY_BUYABLE",
            "locationSchemeId": 2,
            "locationName": "Spens",
            "locationAddress": "Sutjeska 2, Novi Sad",
            "sectors": [
                {
                    "sectorType": "GRANDSTAND",
                    "sectorId": 3,
                    "price": 6.0,
                    "vip": false
                },
                {
                    "sectorType": "GRANDSTAND",
                    "sectorId": 4,
                    "price": 5.0,
                    "vip": false
                },
                {
                    "sectorType": "PARTER",
                    "sectorId": 5,
                    "price": 4.0,
                    "vip": false
                }
            ]
        },
        {
            "id": 3,
            "event": {
                "id": 2,
                "description": "Opis",
                "name": "Koncert Zdravka Colicaa",
                "category": "CULTURAL",
                "dateAndLocationDTO": null
            },
            "date": "2020-02-19",
            "reservationExpireDate": "2020-02-17",
            "eventDayState": "RESERVABLE_AND_BUYABLE",
            "locationSchemeId": 2,
            "locationName": "Spens",
            "locationAddress": "Sutjeska 2, Novi Sad",
            "sectors": [
                {
                    "sectorType": "GRANDSTAND",
                    "sectorId": 3,
                    "price": 6.0,
                    "vip": false
                },
                {
                    "sectorType": "GRANDSTAND",
                    "sectorId": 4,
                    "price": 5.0,
                    "vip": false
                },
                {
                    "sectorType": "PARTER",
                    "sectorId": 5,
                    "price": 3.0,
                    "vip": false
                }
            ]
        }
      ]
    ))
    }

    let routeMock = {
      snapshot: {
        params: {
          id: 2
        }
      }
    }

    TestBed.configureTestingModule({
      declarations: [EditEventComponent, EditEventDayComponent],
      imports: [CoreModulesModule],
      providers: [HttpClient, HttpHandler, {provide: EventService, useValue: eventServiceMock}, {provide: ActivatedRoute, useValue: routeMock}, {provide: Router, useValue: routerMock}]
    });

    fixture = TestBed.createComponent(EditEventComponent);
    component = fixture.componentInstance;
    eventService = TestBed.get(EventService);
    route = TestBed.get(ActivatedRoute);
    router = TestBed.get(Router);
  })

  // a helper function to tell Angular that an event on the HTML page has happened
  function newEvent(eventName: string, bubbles = false, cancelable = false) {
    let evt = document.createEvent('CustomEvent');  // MUST be 'CustomEvent'
    evt.initCustomEvent(eventName, bubbles, cancelable, null);
    return evt;
  }

  it('should create', function() {
    expect(component).toBeTruthy();
  })

  it('should bind data to name, description and category input',  fakeAsync(() => {
    fixture.detectChanges();
    tick();

    expect(eventService.getEventDays).toHaveBeenCalledWith(2);
    
    expect(component.event.name).toEqual("Koncert Zdravka Colicaa");
    expect(component.event.description).toEqual("Opis")
    expect(component.event.category).toEqual("CULTURAL");
  }));

  it('should make the changes in inputs', fakeAsync(() => {
    fixture.detectChanges();
    tick();

    let nameInput = fixture.debugElement.query(By.css('#edit-event-name-input')).nativeElement;
    nameInput.value = "Koncert Zdravka Colicaa edited";
    let descriptionInput = fixture.debugElement.query(By.css('#edit-event-description-input')).nativeElement;
    descriptionInput.value = "Opis edited";
    let categorySelect = fixture.debugElement.query(By.css('#edit-event-category-select')).nativeElement;
    categorySelect.click();

    fixture.detectChanges();

    tick();
    
    let selectOptions = fixture.debugElement.queryAll(By.css('.edit-event-category-option'));
    selectOptions[0].nativeElement.click();
    
    nameInput.dispatchEvent(newEvent('input'));
    descriptionInput.dispatchEvent(newEvent('input'));
    categorySelect.dispatchEvent(newEvent('change'));
    
    expect(component.event.name).toEqual("Koncert Zdravka Colicaa edited");
    expect(component.event.description).toEqual("Opis edited");
    expect(component.event.category).toEqual("SPORT");
  }))

  it('should save the changes',   fakeAsync(() => {
    fixture.detectChanges();
    tick();

    let saveChangesButton = fixture.debugElement.query(By.css('#save-event-changes')).nativeElement;
    saveChangesButton.click();

    fixture.detectChanges();
    expect(eventService.updateEvent).toHaveBeenCalledWith(2, component.event);

  })); 
});
