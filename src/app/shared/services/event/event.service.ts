import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable, of, throwError as observableThrowError } from 'rxjs';
import { PageEvent } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { EventDayReservationDto } from '../../model/EventDayReservationDto';

const ENDPOINTS = {
  ALLEVENTS : '/event/getAll',
  EVENTS: '/event/show-events',
  EVENT: "/event/",
  EVENTDAY: "/event/eventDay/",
  RESERVE: "/event/reserve"
};

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    private http: HttpClient,
  ) { }

  
  getAllEvents():Observable<any>{
    return this.http.get(ENDPOINTS.ALLEVENTS); 
  }

  reserve(eventDayReservationDto: EventDayReservationDto): Observable<any> {
    return this.http.post<any>(ENDPOINTS.RESERVE, eventDayReservationDto
    ).pipe(
      tap(),
      catchError(err => { return this.errorHandler(err) }))
  };

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "server error.");
  }

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

  createEvent(eventData: any): Observable<any> {
    return this.http.post(ENDPOINTS.EVENT, eventData);
  }

  updateEvent(eventId: string, eventData: any): Observable<any> {
    return this.http.put(ENDPOINTS.EVENT + eventId, eventData);
  }
  
  updateEventDay(eventDayId: string, eventDayData: any): Observable<any> {
    return this.http.put(ENDPOINTS.EVENTDAY + eventDayId, eventDayData);
  }
}
