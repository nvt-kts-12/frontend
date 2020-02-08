import { NgModule } from '@angular/core';
import { CreateEventComponent } from './create-event/create-event.component';
import { CreateEventDaysComponent } from './create-event/create-event-days/create-event-days.component';
import { CreateEventDayComponent } from './create-event/create-event-day/create-event-day.component';
import { CreateEventDayInfoComponent } from './create-event/create-event-days/create-event-day-info/create-event-day-info.component';
import { ChooseSectorsComponent } from './create-event/create-event-day/choose-sectors/choose-sectors.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { EditEventDayComponent } from './edit-event/edit-event-day/edit-event-day.component';
import { CoreModulesModule } from 'src/app/shared/components/core.module';
import { EventViewModule } from '../../home/event-view/event-view.module';

@NgModule({
  declarations: [
    CreateEventComponent,
    CreateEventDaysComponent,
    CreateEventDayComponent,
    CreateEventDayInfoComponent,
    ChooseSectorsComponent,
    EditEventComponent,
    EditEventDayComponent,
  ],
  imports: [
    CoreModulesModule,
    EventViewModule
  ],
})
export class EventModule { }
