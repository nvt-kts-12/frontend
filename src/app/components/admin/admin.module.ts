import { NgModule } from '@angular/core';
import { CoreModulesModule } from './../../shared/components/core.module';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { EventModule } from './event/event.module';
import { LocationModule } from './location/location.module';
import { ReportModule } from './reports/report.module';


@NgModule({
  declarations: [
    AdminPageComponent,
  ],
  imports: [
    CoreModulesModule,
    EventModule,
    LocationModule,
    ReportModule
  ],
  exports: [AdminPageComponent]
})
export class AdminModule { }
