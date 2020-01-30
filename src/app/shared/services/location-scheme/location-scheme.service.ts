import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable, of, throwError as observableThrowError} from 'rxjs';
import { PageEvent } from '@angular/material';
import { HttpErrorResponse} from '@angular/common/http';

const ENDPOINTS = {
  LOCATION_SCHEMES: '/locationScheme',
  LOCATION_SCHEME_SECTORS: '/locationSchemeSector'
};

@Injectable({
  providedIn: 'root'
})
export class LocationSchemeService {

  constructor(
    private http: HttpClient,
  ) { }


  getLocationSchemes(): Observable<any> {
    return this.http.get(ENDPOINTS.LOCATION_SCHEMES);
  }

  getLocationSchemeSectors(locationSchemeId): Observable<any> {
    return this.http.get(ENDPOINTS.LOCATION_SCHEME_SECTORS + '/' + locationSchemeId);
  }

  createLocationScheme(data): Observable<any> {
    return this.http.post(ENDPOINTS.LOCATION_SCHEME_SECTORS, data);
  }

  getLocationScheme(locationSchemeId): Observable<any> {
    return this.http.get(ENDPOINTS.LOCATION_SCHEMES + '/' + locationSchemeId);
  }

  updateLocationScheme(locationSchemeData): Observable<any> {
    return this.http.post(ENDPOINTS.LOCATION_SCHEME_SECTORS, locationSchemeData);
  }

  deleteLocationScheme(locationSchemeData): Observable<any> {
    let options = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
      }),
      body: locationSchemeData
    }
    return this.http.delete(ENDPOINTS.LOCATION_SCHEME_SECTORS, options);
  }
}
