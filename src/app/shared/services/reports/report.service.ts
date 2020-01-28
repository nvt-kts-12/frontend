import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const ENDPOINTS = {
  EVENTREPORT: '/reports/event/',
  EVENTDAYSREPORT: '/reports/eventDay/',
  LOCATIONREPORT: '/reports/location/',
  ALLLOCATIONS: '/locationScheme'
};

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient,
  ) { }

  getAllLocations():Observable<any>{
    return this.http.get(ENDPOINTS.ALLLOCATIONS); 
  }

  getEventReport(eventId: string): Observable<any> {
    return this.http.get(ENDPOINTS.EVENTREPORT + eventId); }

  getEventDaysReport(eventDayId : string):Observable<any> {
    return this.http.get(ENDPOINTS.EVENTDAYSREPORT + eventDayId) }

  getLocationReport(locationId : string):Observable<any> {
    return this.http.get(ENDPOINTS.LOCATIONREPORT + locationId) }
  

}
