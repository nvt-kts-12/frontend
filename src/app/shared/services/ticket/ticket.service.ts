import { Injectable } from '@angular/core';
import { User, AuthStore, AuthQuery } from '../../store';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable, of, throwError as observableThrowError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

const ENDPOINTS = {
  ALL_TICKETS: '/ticket/',
  CANCEL_RESERVATION: "/ticket/cancel/",
  CONFIRM_RESERVATION: "/ticket/buy/"
};

@Injectable({
  providedIn: 'root'
})

export class TicketService {
  constructor(private http: HttpClient) {

  }


  confirmReservation(ticketId: string): Observable<any> {
    return this.http.put(ENDPOINTS.CONFIRM_RESERVATION + ticketId, {});
  }

  cancelReservation(ticketId): Observable<any> {
    return this.http.put(ENDPOINTS.CANCEL_RESERVATION + ticketId, {});
  }

  getAllTickets(sectorId: number, eventDayId: number): Observable<any> {
    return this.http.get(ENDPOINTS.ALL_TICKETS + sectorId + '/' + eventDayId);
  }

}



