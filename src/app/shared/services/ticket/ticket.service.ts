import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable, of, throwError as observableThrowError} from 'rxjs';
import { PageEvent } from '@angular/material';
import { HttpErrorResponse} from '@angular/common/http';

const ENDPOINTS = {
    ALL_TICKETS: '/ticket/',
};

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(
    private http: HttpClient,
  ) { }


  getAllTickets(sectorId: number, eventDayId: number): Observable<any> {
    return this.http.get(ENDPOINTS.ALL_TICKETS + sectorId + '/' + eventDayId);
  }
}
