import 'zone.js/dist/zone-testing';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { TicketReservationComponent } from './ticket-reservation.component';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { of } from 'rxjs';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { CoreModulesModule } from 'src/app/shared/components/core.module';
import { EventService } from 'src/app/shared/services/event/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SectorComponent } from '../../home/event-reservation/sector/sector.component';
import { GrandstandPopupComponent } from '../../home/event-reservation/grandstand-popup/grandstand-popup.component';
import { By } from '@angular/platform-browser';
import { element } from '@angular/core/src/render3';


describe('TicketReservationComponent', () => {
  let component: TicketReservationComponent;
  let fixture: ComponentFixture<TicketReservationComponent>;
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
      getEventDay: jasmine.createSpy('getEventDay').and.returnValue(of(
        {
          "id": 4,
          "event": { id: 2, description: "Dodjite da navijamo", name: "Odbojka Vojvodina - Proleter Zrenjanin", category: "SPORT", dateAndLocationDTO: null },
          "date": "2020-03-18",
          "reservationExpireDate": "2020-03-17",
          "eventDayState": "RESERVABLE_AND_BUYABLE",
          "locationId": 4,
          "locationName": "Spens",
          "locationAddress": "Sutjeska 2, Novi Sad",
          "sectors": [{
            "id": 4,
            "deleted": false,
            "topLeftX": 94,
            "topLeftY": 18,
            "bottomRightX": 413,
            "bottomRightY": 83,
            "capacity": 40,
            "rowNum": 10,
            "colNum": 4,
            "numOfAvailablePlaces": 38,
            "price": 500,
            "type": "GRANDSTAND"
          },
          {
            "id": 5,
            "deleted": false,
            "topLeftX": 99,
            "topLeftY": 219,
            "bottomRightX": 416,
            "bottomRightY": 286,
            "capacity": 40,
            "rowNum": 10,
            "colNum": 4,
            "numOfAvailablePlaces": 40,
            "price": 500,
            "type": "GRANDSTAND"
          }]
        }
      ))
    }

    /*event/2/event-day/4*/
    let routeMock = {
      snapshot: {
        params: {
          event: 2,
          eventDay: 4
        }
      }
    }


    TestBed.configureTestingModule({
      declarations: [TicketReservationComponent, SectorComponent, GrandstandPopupComponent],
      imports: [CoreModulesModule],
      providers: [HttpClient, HttpHandler, { provide: EventService, useValue: eventServiceMock }, {provide: ActivatedRoute, useValue: routeMock}, {provide: Router, useValue: routerMock}]
    });

    fixture = TestBed.createComponent(TicketReservationComponent);
    component = fixture.componentInstance;
    eventService = TestBed.get(EventService);
    route = TestBed.get(ActivatedRoute);
    router = TestBed.get(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get event day data', fakeAsync(() => {
    fixture.detectChanges();
    tick();

    expect(eventService.getEventDay).toHaveBeenCalledTimes(1);
    
    expect(component.eventDay.event.name).toEqual('Odbojka Vojvodina - Proleter Zrenjanin');
    expect(component.eventDay.event.description).toEqual("Dodjite da navijamo")
    expect(component.eventDay.event.category).toEqual('SPORT');
    expect(component.eventDay.locationName).toEqual("Spens");
  }));

  it('should show event day data', fakeAsync(() => {
    fixture.detectChanges();
    tick();

    let eventName = fixture.debugElement.query(By.css("#eventNameTitle")).nativeElement;
    let locationName = fixture.debugElement.query(By.css("#locationNameTitle")).nativeElement;
    let rect = fixture.debugElement.query(By.css('#sectorRect')).nativeElement;

    expect(eventName.textContent.trim()).toEqual('Odbojka Vojvodina - Proleter Zrenjanin');
    expect(locationName.textContent.trim()).toEqual('Spens layout:');
    expect(rect.getAttribute('x')).toEqual('94');

    let sector = fixture.debugElement.query(By.css('#sectorComponent')).nativeElement;
    sector.click();

    fixture.detectChanges();
    tick();

    let sectorTitle = fixture.debugElement.query(By.css('#sectorTitle')).nativeElement;
    expect(sectorTitle.textContent.trim()).toEqual('GRANDSTAND, price: $500');
  }))
});
