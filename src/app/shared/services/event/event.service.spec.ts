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

   })
 
});