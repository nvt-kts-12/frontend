import { NgModule } from '@angular/core';
import { CoreModulesModule } from './../../shared/components/core.module';
import { DatePipe } from '@angular/common';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { CreateEventDaysComponent } from './create-event/create-event-days/create-event-days.component';
import { CreateEventDayComponent } from './create-event/create-event-day/create-event-day.component';
import { CreateEventDayInfoComponent } from './create-event/create-event-days/create-event-day-info/create-event-day-info.component';
import { ChooseSectorsComponent } from './create-event/create-event-day/choose-sectors/choose-sectors.component';
import { CreateLocationSchemeComponent } from './create-location-scheme/create-location-scheme.component';
import { LocationSchemeInfoComponent } from './create-location-scheme/location-scheme-info/location-scheme-info.component';
import { CreateLocationSectorsComponent } from './create-location-scheme/create-location-sectors/create-location-sectors.component';
import { DrawSectorsComponent } from './create-location-scheme/create-location-sectors/draw-sectors/draw-sectors.component';
import { ReportsComponent } from '../reports/reports.component';
import { MatOptionModule,MatSelectModule,MatTabsModule } from '@angular/material';


@NgModule({
  declarations: [
    AdminPageComponent,
    CreateEventComponent,
    CreateEventDaysComponent,
    CreateEventDayComponent,
    CreateEventDayInfoComponent,
    ChooseSectorsComponent,
    CreateLocationSchemeComponent,
    LocationSchemeInfoComponent,
    CreateLocationSectorsComponent,
    DrawSectorsComponent,
    ReportsComponent
  ],
  imports: [
    CoreModulesModule,
    MatOptionModule,
    MatSelectModule,
    MatTabsModule
  ],
  providers: [
    DatePipe
  ],
  exports: [AdminPageComponent]
})
export class AdminModule { }
