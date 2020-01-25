import { NgModule } from '@angular/core';
import { CoreModulesModule } from './../../shared/components/core.module';
import { DatePipe } from '@angular/common';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { CreateEventDaysComponent } from './create-event/create-event-days/create-event-days.component';
import { CreateEventDayComponent } from './create-event/create-event-day/create-event-day.component';
import { CreateEventDayInfoComponent } from './create-event/create-event-days/create-event-day-info/create-event-day-info.component';
import { ChooseSectorsComponent } from './create-event/create-event-day/choose-sectors/choose-sectors.component';

@NgModule({
  declarations: [
    AdminPageComponent,
    CreateEventComponent,
    CreateEventDaysComponent,
    CreateEventDayComponent,
    CreateEventDayInfoComponent,
    ChooseSectorsComponent
  ],
  imports: [
    CoreModulesModule
  ],
  providers: [
    DatePipe
  ],
  exports: [AdminPageComponent]
})
export class AdminModule { }
