import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable, of, throwError as observableThrowError} from 'rxjs';
import { PageEvent } from '@angular/material';
import { HttpErrorResponse} from '@angular/common/http';

const ENDPOINTS = {
  RESERVATIONS: '/user/reservations',
  BOUGHT_TICKETS: "/user/bought"
};

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    private http: HttpClient,
  ) { }

  getReservations(): Observable<any> {
    return this.http.get(ENDPOINTS.RESERVATIONS);
  }
}
