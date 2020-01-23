import { Injectable } from '@angular/core';
import { User, AuthStore,AuthQuery } from '../../store';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const ENDPOINTS = {
  UPDATE: '/user/edit-profile',
};

@Injectable({
  providedIn: 'root'
})

export class EditProfileService {
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
 
  handleError(handleError: Error): Promise<any> {
    throw new Error(handleError.message);
  }
}


