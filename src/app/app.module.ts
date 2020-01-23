import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule, LOCALE_ID, ErrorHandler } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient, HttpBackend } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './router/app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './components/home/home.module';
import { AccountModule } from './components/account/account.module';
import { HttpApiInterceptor } from './shared/config';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavbarModule } from './components/navbar/navbar.module';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';
import { SnackbarComponent } from './components/common/snackbar/snackbar.component';
import { AdminModule } from './components/admin/admin.module';

export function HttpLoaderFactory(handler: HttpBackend) {
  return new TranslateHttpLoader(new HttpClient(handler));
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SnackbarComponent
  ],
  entryComponents: [SnackbarComponent],
  imports: [
    CommonModule,
    BrowserModule.withServerTransition({ appId: 'angular-app' }),
    AppRoutingModule,
    NavbarModule,
    HomeModule,
    AccountModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpBackend]
        }
    }),
    AdminModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'en' },
    { provide: HTTP_INTERCEPTORS, useClass: HttpApiInterceptor, multi: true },
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 5000, horizontalPosition: "right", verticalPosition: "bottom"},}
  ]
})
export class AppModule {
}
