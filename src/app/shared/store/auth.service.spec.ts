import { TestBed } from '@angular/core/testing';
import {BaseRequestOptions, ConnectionBackend, Http, RequestOptions} from '@angular/http';
import {Response, ResponseOptions, RequestMethod} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {async, fakeAsync, tick} from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AuthStore } from './auth.store';
import { MatSnackBar } from '@angular/material';
import { Overlay } from '@angular/cdk/overlay';
import { UserProfileComponent } from 'src/app/components/user/user-profile/user-profile.component';
import { User } from '../model/User';
import { tap } from 'rxjs/operators';

describe('AuthService', () => {

    let authService: AuthService;
    let backend: any;
    let authStore: AuthStore;
    let lastConnection: any;

    beforeEach(() => {


        let authStoreMock = {
            updateRoot: jasmine.createSpy('updateRoot')
        }

        let matSnackBarMock = {
            openFromComponent: jasmine.createSpy('openFromComponent')
        }

        TestBed.configureTestingModule({
            providers: [
                {provide: ConnectionBackend, useClass: MockBackend},
                {provide: RequestOptions, useClass: BaseRequestOptions},
                Http,
                AuthService,
                HttpClient,
                HttpHandler,
                {provide: AuthStore, useValue: authStoreMock},
                {provide: MatSnackBar, useValue: matSnackBarMock},
                Overlay
            ]
        })

        authService = TestBed.get(AuthService);
        backend = TestBed.get(ConnectionBackend);
        backend.connections.subscribe((connection: any) =>
            lastConnection = connection);
        authStore = TestBed.get(AuthStore);
    });

    it('should pass simple test', () => {
        expect(true).toBe(true);
    })

    it('login() should query url and get a token', fakeAsync(() => {
        
        let user = {
            username: "user",
            password: "User123!"
        }

        let userResponse: {
            username: "user",
            firstName: "pera",
            lastName: "peric",
            email: "pera@gmail.com",
            authorty: "ROLE_REGISTERED"
        }

        authService.login(user).subscribe((res) => {
            console.log(res);
        })

    }))
})