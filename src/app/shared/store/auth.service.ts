import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AuthStore } from './auth.store';
import { Response } from '@angular/http';
import { stringify } from 'querystring';

const ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  ME: '/user/me'
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * @method constructor
   * @param http {HttpClient}
   */
  constructor(
    private http: HttpClient,
    private authStore: AuthStore
  ) { }

  /**
   * Send HTTP Request and login user to the application
   * Save token to the localstorage
   * @method login
   * @param data {any}
   * @returns Observable<any>
   */
  login(data: any): Observable<any> {
     return this.http.post(ENDPOINTS.LOGIN, data).pipe(
      tap((data: { accessToken: string }) => {
        this.authStore.updateRoot((state) => ({
          token: data.accessToken
        }));        
      })
    ).pipe(
      tap(() => {
        this.http.get<any>(ENDPOINTS.ME).subscribe(
          res => {
            
            let userFromResponse = {
              username: res.username,
              firstName: res.firstName,
              lastName: res.lastName,
              email: res.email,
              authority: res.authorities[0].authority
            }
            
            this.authStore.updateRoot((state) => ({
              user: userFromResponse
            }))
          }
        )
      })
    );
  }

  /**
   * Register user to the application and
   * save token from response to the localstorage
   * @param data {any}
   * @returns Observable<any>
   */
  register(data: any): Observable<any> {
    return this.http.post(ENDPOINTS.REGISTER, data).pipe(
      tap((data: { token: string }) => {
        this.authStore.updateRoot({
          token: data.token,
          user: {
            email: 'jon@doe.com' // TODO: change this after implementation
          }
        });
      })
    );
  }

  /**
   * Logout user
   * Clear auth data from the localstorage
   * @method logout
   * @returns void
   */
  logout() {
    this.authStore.updateRoot({
      token: null,
      user: null
    })
  }
}
