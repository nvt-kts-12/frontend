import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}
