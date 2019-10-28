
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { environment } from './../../../environments/environment';
import { AuthQuery, AuthService } from './../store';
import { Router } from '@angular/router';
import { SiteRoutes } from '../constants';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpApiInterceptor implements HttpInterceptor {
  /**
   * @method constructor
   * @param authService {AuthService}
   */
  constructor(
    private authQuery: AuthQuery,
    private router: Router,
    private authService: AuthService
  ) { }

  /**
   * Intercept request and attach headers to the request
   * This interceptor will atach Authorize header
   * @method intercept
   * @param req {HttpRequest}
   * @param next {HttpHandler}
   * @returns Observable<HttpEvent>
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = environment.apiUrl;
    let observable: Observable<HttpEvent<any>>;
    this.authQuery.token$.subscribe((token) => {
      let authHeaders = token
        ? {
          'Authorization': `Bearer ${token}`,
        }
        : {};

      req = req.clone({
        url: url + req.url,
        setHeaders: {
          'Content-Type' : 'application/json; charset=utf-8',
          'Accept'       : 'application/json',
          ...authHeaders
        },
      });
      observable = next.handle(req).pipe(catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 403) {
          this.handleAuthError(error);
        }
        return of(error);
      }));
    });

    return observable
  }

  /**
   * Handle auth problem with request, usually 403
   * @param {HttpErrorResponse} error
   */
  handleAuthError(error: HttpErrorResponse) {
    this.router.navigate([SiteRoutes.LOGIN]);
    this.authService.logout();
  }
}
