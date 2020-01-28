import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable, of, throwError as observableThrowError } from 'rxjs';
import { PageEvent } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

const ENDPOINTS = {
    MAKE_PAYMENT: '/paypal/make/payment',
    COMPLETE_PAYMENT: '/paypal/complete/payment',
};

@Injectable({
    providedIn: 'root'
})
export class PayPalService {

    constructor(
        private http: HttpClient,
    ) { }


    makePayment(sum): Observable<any> {
        return this.http.post(ENDPOINTS.MAKE_PAYMENT, sum);
    }

    completePayment(paymentId, payerId): Observable<any> {
        return this.http.post(ENDPOINTS.COMPLETE_PAYMENT + '?paymentId='
            + paymentId + '&payerId=' + payerId, {});

            
            // .pipe(
            // map((response: Response) => response.json())
            // )
    };

}
