import { Injectable } from '@angular/core';
import { User, AuthStore,AuthQuery } from '../../store';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const ENDPOINTS = {
  CANCEL_RESERVATION: "/ticket/cancel/"
};

@Injectable({
  providedIn: 'root'
})

export class TicketService {
  constructor(private http: HttpClient) {
     
    }
   
  cancelReservation(ticketId): Observable<any> {
    return this.http.put(ENDPOINTS.CANCEL_RESERVATION + ticketId, {});
  }

}