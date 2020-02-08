import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { CoreModulesModule } from 'src/app/shared/components/core.module';
import { AuthService } from 'src/app/shared/store';
import { AppModule } from 'src/app/app.module';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core'
import { TranslateService, TranslateStore } from '@ngx-translate/core';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import {of} from "rxjs";

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let authService: any;
    let router: any;
    let translate: any

    beforeAll(() => {
        TestBed.resetTestEnvironment();
        TestBed.initTestEnvironment(BrowserDynamicTestingModule,
                                    platformBrowserDynamicTesting());
      })

    beforeEach(() => {
        let authServiceMock = {
            login: jasmine.createSpy('login')
                .and.returnValue(of({}))
        }

        let routerMock = {
            navigate: jasmine.createSpy('navigate')
        }

        let translateMock = {
            translate: jasmine.createSpy('translate').and.returnValue(of({}))
        }

        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [CoreModulesModule],
            providers: [HttpClient, HttpHandler, {provide: Router, useValue: routerMock},
            {provide: AuthService, useValue: authServiceMock}, {provide: TranslateService, useValue: translateMock}]
        })

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        authService = TestBed.get(AuthService);
        translate = TestBed.get(TranslateService);
        router = TestBed.get(Router);
    })

    it('should create', function () {
        expect(component).toBeTruthy();
    })

      // a helper function to tell Angular that an event on the HTML page has happened
  function newEvent(eventName: string, bubbles = false, cancelable = false) {
    let evt = document.createEvent('CustomEvent');  // MUST be 'CustomEvent'
    evt.initCustomEvent(eventName, bubbles, cancelable, null);
    return evt;
  }

    it('should bind data from input fields to username and password', function()  {
        fixture.detectChanges();

        // initially, username and password are empty strings
        expect(component.username.value).toEqual('');
        expect(component.password.value).toEqual('');

        // insert data
        let usernameInput = fixture.debugElement.query(By.css("#usernameInput")).nativeElement;
        usernameInput.value = "user";
        let passwordInput = fixture.debugElement.query(By.css("#passwordInput")).nativeElement;
        passwordInput.value = "User123!";


        // bind data from HTML components to the object
        usernameInput.dispatchEvent(newEvent('input'))
        passwordInput.dispatchEvent(newEvent('input'));

        // expect that data from HTML components are copied into the username and password
        expect(component.username.value).toEqual("user");
        expect(component.password.value).toEqual("User123!");
        

    })

    it('should click login button', function() {
        let button = fixture.debugElement.query(By.css("#submitLogin")).nativeElement;
        button.click();

    })

    it('should call login', () => {
        component.onSubmit();

        expect(authService.login).toHaveBeenCalled();
    })

    it('should go to home page', () => {
        expect(router.navigate).toHaveBeenCalledWith(["/"]);
    })
})