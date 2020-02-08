import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule, LOCALE_ID, ErrorHandler } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient, HttpBackend } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './router/app-routing.module';
import { HttpApiInterceptor } from './shared/config';
import { MainModule } from './shared/components/main.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavbarModule } from './components/navbar/navbar.module';

export function HttpLoaderFactory(handler: HttpBackend) {
  return new TranslateHttpLoader(new HttpClient(handler));
}

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [
    NavbarModule,
    CommonModule,
    BrowserModule.withServerTransition({ appId: 'angular-app' }),
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpBackend]
        }
    }),
    MainModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'en' },
    { provide: HTTP_INTERCEPTORS, useClass: HttpApiInterceptor, multi: true },
  ]
})
export class AppModule {
}
