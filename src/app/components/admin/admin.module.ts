import { NgModule } from '@angular/core';
import { CoreModulesModule } from './../../shared/components/core.module';
import { DatePipe } from '@angular/common';
import { AdminPageComponent } from './admin-page/admin-page.component';

@NgModule({
  declarations: [
    AdminPageComponent
  ],
  imports: [
    CoreModulesModule
  ],
  providers: [
    DatePipe
  ],
  exports: []
})
export class AdminModule { }
