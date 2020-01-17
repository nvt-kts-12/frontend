import { NgModule } from '@angular/core';
import {
  MatSidenavModule,
  MatIconModule,
  MatToolbarModule,
} from '@angular/material';

import { HomeComponent } from './home.component';
import { CoreModulesModule } from './../../shared/components/core.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CoreModulesModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
