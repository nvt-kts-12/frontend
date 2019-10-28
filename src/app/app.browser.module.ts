import { NgModule } from '@angular/core';
import { AppModule } from './app.module';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    AppModule,
    AkitaNgDevtools.forRoot(),
  ],
  bootstrap: [AppComponent]
})
export class AppBrowserModule {
}
