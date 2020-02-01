import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const ENDPOINTS = {
  EVENT_REPORT: '/reports/event/',
  EVENTDAYS_REPORT: '/reports/eventDay/',
  LOCATION_REPORT: '/reports/location/',
  ALL_LOCATIONS: '/locationScheme'
};

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient,
  ) { }

  getAllLocations():Observable<any>{
    return this.http.get(ENDPOINTS.ALL_LOCATIONS); 
  }

  getEventReport(eventId: string): Observable<any> {
    return this.http.get(ENDPOINTS.EVENT_REPORT + eventId); }

  getEventDaysReport(eventDayId : string):Observable<any> {
    return this.http.get(ENDPOINTS.EVENTDAYS_REPORT + eventDayId) }

  getLocationReport(locationId : string):Observable<any> {
    return this.http.get(ENDPOINTS.LOCATION_REPORT + locationId) }
  

}
