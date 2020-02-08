import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { EventDaysComponent } from './event-days.component';
import { CoreModulesModule } from 'src/app/shared/components/core.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { EventService } from 'src/app/shared/services/event/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivatedRouteStub } from 'src/app/testing/router-stubs';
import { EventDayState } from 'src/app/shared/model/EventDayState';
import { SectorType } from 'src/app/shared/model/SectorType';
import { EventCategory } from 'src/app/shared/model/EventCategory';
import { By } from '@angular/platform-browser';

describe('EventDaysComponent', () => {
  let component: EventDaysComponent;
  let fixture: ComponentFixture<EventDaysComponent>;
  let eventService: EventService;
  let activatedRoute: ActivatedRoute;
  let router: Router;

  let eventId = "1";

  beforeEach(() => {
    
    let activatedRouteStub: ActivatedRouteStub = new ActivatedRouteStub();
    activatedRouteStub.testParams = {id : eventId};

    let eventServiceMock = {
      getEventDays: jasmine.createSpy('getEventDays')
          .and.returnValue(Promise.resolve([
            {
              id: 1,
              event: {
                id: 1,
                description: "opis",
                name: "Film 1",
                category: EventCategory.ENTERTAINMENT
              },
              date: "2020-02-15",
              reservationExpireDate: "2020-02-12",
              eventDayState: EventDayState.RESERVABLE_AND_BUYABLE,
              locationSchemeId: 1,
              locationName: "Arena cineplex",
              locationAddress: "Bul. Mihajla Pupina 3, Novi Sad",
              sectors: [
                {
                  sectorType: SectorType.GRANDSTAND,
                  sectorId: 1,
                  price: 3,
                  vip: false
                },
                {
                  sectorType: SectorType.PARTER,
                  sectorId: 6,
                  price: 5,
                  vip: true
                }
              ]
            }
          ])), 
    };

    let routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      declarations: [ EventDaysComponent ],
      imports: [CoreModulesModule],
      providers: [
        {provide: EventService, useValue: eventServiceMock},
        {provide: ActivatedRoute, useValue: activatedRouteStub},
        {provide: Router, useValue: routerMock}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })


    fixture = TestBed.createComponent(EventDaysComponent);
    component = fixture.componentInstance;
    eventService = TestBed.get(EventService);
    activatedRoute = TestBed.get(ActivatedRoute);
    router = TestBed.get(Router);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch event with event-days on init', fakeAsync(() => {
    component.ngOnInit();
    expect(component.eventId).toBe(eventId);
    // expect(component.fetchData).toHaveBeenCalled();
    expect(eventService.getEventDays).toHaveBeenCalledWith(eventId);
    tick();

    // shoud fetch event from service
    expect(component.event.description).toBe("opis");
    expect(component.event.name).toBe("Film 1");
    expect(component.event.category).toBe(EventCategory.ENTERTAINMENT);
    expect(component.eventDays[0].date).toBe("2020-02-15");
    expect(component.eventDays[0].reservationExpireDate).toBe("2020-02-12");
    expect(component.eventDays[0].eventDayState).toBe(EventDayState.RESERVABLE_AND_BUYABLE);
    expect(component.eventDays[0].locationSchemeId).toBe(1);
    expect(component.eventDays[0].locationName).toBe("Arena cineplex");
    expect(component.eventDays[0].locationAdress).toBe("Bul. Mihajla Pupina 3, Novi Sad");
    expect(component.eventDays[0].sectors[0].type).toBe(SectorType.GRANDSTAND);
    expect(component.eventDays[0].sectors[0].id).toBe(1);
    expect(component.eventDays[0].sectors[0].price).toBe(3);
    expect(component.eventDays[0].sectors[0].vip).toBe(false);
    expect(component.eventDays[0].sectors[1].type).toBe(SectorType.PARTER);
    expect(component.eventDays[0].sectors[1].id).toBe(6);
    expect(component.eventDays[0].sectors[1].price).toBe(5);
    expect(component.eventDays[0].sectors[1].vip).toBe(true);

    //should display fetched student
    fixture.detectChanges(); // tell angular that data are fetched
    tick(); // initiate next cycle of binding these data to HTML components
    fixture.detectChanges(); // detect changes in the HTML components
    // assert that values in the HTML components are as expected

    let eventName = fixture.debugElement.query(By.css('#event-name')).nativeElement;
    let eventCategory = fixture.debugElement.query(By.css('#event-category')).nativeElement;
    let eventDescription = fixture.debugElement.query(By.css('#event-description')).nativeElement;

    expect(eventName.value).toBe("Film 1");
    expect(eventCategory.value).toBe(EventCategory.ENTERTAINMENT);
    expect(eventDescription.value).toBe("opis");

  }))
});