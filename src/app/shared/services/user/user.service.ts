import { Injectable } from '@angular/core';
import { User, AuthStore,AuthQuery } from '../../store';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const ENDPOINTS = {
  UPDATE: '/user/edit-profile',
  RESERVATIONS: '/user/reservations',
  BOUGHT_TICKETS: "/user/bought"
};

@Injectable({
  providedIn: 'root'
})

export class UserService {
  user: User;
  
  constructor(private http: HttpClient, private authStore : AuthStore) {
     
   }

  update(user: User): Observable<User> {

    let url = ENDPOINTS.UPDATE;

    return this.http.put<User>(url, user).pipe(
      tap(user => {
        this.authStore.updateRoot((state) => ({
          user: user
        }));
      })
    );
  }
  
  getReservations(): Observable<any> {
    return this.http.get(ENDPOINTS.RESERVATIONS);
  }

  getBoughtTickets(): Observable<any> {
    return this.http.get(ENDPOINTS.BOUGHT_TICKETS);
  }

}