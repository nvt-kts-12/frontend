import { TestBed } from '@angular/core/testing';
import {BaseRequestOptions, ConnectionBackend, Http, RequestOptions} from '@angular/http';
import {Response, ResponseOptions, RequestMethod} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {async, fakeAsync, tick} from '@angular/core/testing';
import { EventService } from './event.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { EventDay } from '../../model/EventDay';
import { EventCategory } from '../../model/EventCategory';
import { EventDayState } from '../../model/EventDayState';
import { SectorType } from '../../model/SectorType';

describe('EventService', () => {

   let eventService: EventService;
   let backend : any;
   let lastConnection : any;

	beforeEach(() => {

    TestBed.configureTestingModule({
       providers:    [ 
          {provide: ConnectionBackend, useClass: MockBackend},
          {provide: RequestOptions, useClass: BaseRequestOptions},
          Http,
          HttpClient,
          HttpHandler,
          EventService ],
    });

    eventService = TestBed.get(EventService);
    backend = TestBed.get(ConnectionBackend);
    backend.connections.subscribe((connection: any) => 
       lastConnection = connection);
	});
 	
 	it('should pass simple test', () => {
	    expect(true).toBe(true);
   });

   it('getEventDays() should query current service url', () => {
      eventService.getEventDays("1");
      expect(lastConnection).toBeDefined('no http service connection at all?');
      expect(lastConnection.request.url).toMatch(/api\/event\/1$/, 'url invalid');
   })
   
   it('getEventDays() should return some event days', () => {
      
      let eventDays: EventDay[];
      
      eventService.getEventDays("1").subscribe((res) => 
         eventDays = res
      )

      lastConnection.mockRespond(new Response(new ResponseOptions({
         body: JSON.stringify([
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
         ])
      })))

      tick();

      expect(eventDays.length).toBe(2);
      expect(eventDays[0].event.name).toBe("Film 1");
      expect(eventDays[0].event.category).toBe(EventCategory.ENTERTAINMENT);
      expect(eventDays[0].date).toBe("2020-02-15");
      expect(eventDays[0].reservationExpireDate).toBe("2020-02-12");
      expect(eventDays[0].eventDayState).toBe(EventDayState.RESERVABLE_AND_BUYABLE);
      expect(eventDays[0].locationSchemeId).toBe(1);
      expect(eventDays[0].locationName).toBe("Arena cineplex");
      expect(eventDays[0].locationAdress).toBe("Bul. Mihajla Pupina 3, Novi Sad");
      expect(eventDays[0].sectors[0].type).toBe(SectorType.GRANDSTAND);
      expect(eventDays[0].sectors[0].id).toBe(1);
      expect(eventDays[0].sectors[0].price).toBe(3);
      expect(eventDays[0].sectors[0].vip).toBe(false);
      expect(eventDays[0].sectors[1].type).toBe(SectorType.PARTER);
      expect(eventDays[0].sectors[1].id).toBe(6);
      expect(eventDays[0].sectors[1].price).toBe(5);
      expect(eventDays[0].sectors[1].vip).toBe(true);

   })
 
});