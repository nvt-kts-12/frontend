import 'zone.js/dist/zone-testing'
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AuthService } from 'src/app/shared/store';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { TranslateService, TranslateStore } from '@ngx-translate/core';
import { ReportsComponent } from './reports.component';
import { ReportService } from 'src/app/shared/services/reports/report.service';
import { ReportModule } from './report.module';
import { AdminModule } from '../admin.module';
import { CoreModulesModule } from 'src/app/shared/components/core.module';
import { By } from '@angular/platform-browser';
import { assertNotNull } from '@angular/compiler/src/output/output_ast';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { of } from 'rxjs';
import { EventService } from 'src/app/shared/services/event/event.service';

describe('ReportsComponent unit tests', () => {
    let component: ReportsComponent;
    let fixture: ComponentFixture<ReportsComponent>;
    let reportService: any;
    let eventService : any
    let router: any;
    let translate: any


    beforeEach(() => {
        TestBed.resetTestEnvironment();
        TestBed.initTestEnvironment(BrowserDynamicTestingModule,platformBrowserDynamicTesting())

        let eventServiceMock = {
         getAllEvents: jasmine.createSpy('getAllEvents').and.returnValue(of([
          {
            "id": 1,
            "event": {
                "id": 1,
                "description": "Opis",
                "name": "Koncert Zdravka Colicaa",
                "category": "CULTURAL",
                "dateAndLocationDTO": null
            }
          },
          {
            "id": 2,
            "event": {
                "id": 2,
                "description": "Opis2",
                "name": "Utakmica",
                "category": "SPORT",
                "dateAndLocationDTO": null
            }
          }])), 
        
        }        

        let reportServiceMock = {
            getEventReport: jasmine.createSpy('getEventReport')
                .and.returnValue(of([
                  {
                    "id": 1,
                    "event": {
                        "eventDTO":{
                          "id": 1,
                          "date": "2020-06-05"
                        },
                        "numOfTickets": 10,
                        "numOfReservations": 10,
                        "totalIncome" : 2500,
                    }
                  },
                  {
                    "id": 2,
                    "event": {
                      "eventDTO":{
                        "id": 2,
                        "date": "2020-06-06"
                        },
                        "numOfTickets": 5,
                        "numOfReservations": 5,
                        "totalIncome" : 1500,
                    }
                  },
                ])),
                getLocationReport: jasmine.createSpy('getLocationReport')
                .and.returnValue(of([
                  {
                    "id": 1,
                    "location": {
                        "totalIncome" :1000,
                        "incomeByCategory" : 1500,
                        "numOfEventDaysByCategory" : 5
                    }
                  },
                  {
                    "id": 2,
                    "location": {
                        "totalIncome" :250,
                        "incomeByCategory" : 1000,
                        "numOfEventDaysByCategory" : 3
                    }
                  },
                  
                ])),
                getEventDaysReport : jasmine.createSpy('getEventDaysReport')
                .and.returnValue(of([
                  {
                    "id": 1,
                    "date": "2020-06-05",
                    "location": {
                      "locationSchemeId": 1
                    },
                      "reservationExpirationDate": "2020-05-25",
                      "numOfTickets": 0,
                      "numOfReservations": 1,
                      "totalIncome": 0,
                      "avgPrice": 0,
                      "soldBySector": {
                        "1": 0,
                        "2": 0,
                        "3": 0
                    }

                  }
                  
                ])),
                getAllLocations : jasmine.createSpy('getAllLocations')
                .and.returnValue(of([
                  {
                    "id": 1,
                    "location": {
                      "id": 1,
                      "deleted": false,
                      "name": "Petrovaradinska trvrdjava",
                      "address": "Petrovaradin, Novi Sad",
                    }
                  },
                  {
                    "id": 2,
                    "location": {
                      "id": 2,
                      "deleted" : false,
                      "name": "Spens",
                      "address": "Sutjeska 2, Novi Sad"
                    }
                  },  
                ])),
               
      }

        let routerMock = {
            navigate: jasmine.createSpy('navigate')
        }

        let translateMock = {
            translate: jasmine.createSpy('translate')
        }

        TestBed.configureTestingModule({
            declarations: [ReportsComponent],
            imports: [CoreModulesModule],
            providers: [HttpClient, HttpHandler, {provide: Router, useValue: routerMock},
            {provide: ReportService, useValue: reportServiceMock}, {provide: TranslateService, useValue: translateMock},{provide: EventService, useValue: eventServiceMock} ]
        })

        fixture = TestBed.createComponent(ReportsComponent);
        component = fixture.componentInstance; 
        reportService = TestBed.get(ReportService);
        eventService = TestBed.get(EventService);
        router = TestBed.get(Router);      
       
    })
  

    it('should create', function () {
        expect(component).toBeTruthy();
    })

    it('should show reports',  fakeAsync(() => {
       component.ngOnInit()
       console.log("eventReport:",component.eventReport(1));
       console.log("locationReport",component.locationReport(1));
       console.log("eventDayReport",component.eventDaysReport(1));
       
      expect(reportService.getEventReport).toHaveBeenCalledWith(1)
      expect(reportService.getLocationReport).toHaveBeenCalledWith(1)
      
      fixture.detectChanges();
      tick();

      let selectEvent = fixture.debugElement.query(By.css('#eventSelect')).nativeElement;
      selectEvent.click();
      
      fixture.detectChanges();
      tick();

      let selectOptionsEvent = fixture.debugElement.queryAll(By.css('.eventOptions'));
      selectOptionsEvent[0].nativeElement.click();

      fixture.detectChanges();
      tick();

      let selectShowBy = fixture.debugElement.query(By.css('#showBySelect')).nativeElement;
      selectShowBy.click();

      let selectOptionsShowBy = fixture.debugElement.queryAll(By.css('.showByOptions'));
      selectOptionsEvent[0].nativeElement.click();

        
    }))

  

  
})