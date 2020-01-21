import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable, of, throwError as observableThrowError} from 'rxjs';
import { PageEvent } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

const ENDPOINTS = {
  EVENTS: '/event/show-events',
  EVENT: "/event/",
  EVENTDAY: "/event/eventDay/"
};

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    private http: HttpClient,
  ) { }


  getEvents(pagination: any, searchTerm: string, filter: any): Observable<any> {

    let url = ENDPOINTS.EVENTS + "?page=" + pagination.pageIndex + "&size=" + pagination.pageSize + "&searchQuery=" + searchTerm;

    if (filter) {
      if (filter.type) {
        url += "&typeFilter=" + filter.type;
      }
      if (filter.date) {
        url += "&dateFilter=" + filter.date;
      }
      if (filter.location) {
        url += "&locationFilter=" + filter.location;
      }

    }
    

    return this.http.get(url);
  }

  getEventDays(eventId: string): Observable<any> {
    return this.http.get(ENDPOINTS.EVENT + eventId);
  }

  getEventDay(eventDayId: string): Observable<any> {
    return this.http.get(ENDPOINTS.EVENTDAY + eventDayId);
  }
}
