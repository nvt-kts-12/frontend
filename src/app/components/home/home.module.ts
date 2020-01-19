import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { CoreModulesModule } from './../../shared/components/core.module';
import { EventComponent } from '../event/event.component';
import { EventDaysComponent } from '../event-days/event-days.component';
import { EventDayComponent } from '../event-day/event-day.component';


@NgModule({
  declarations: [
    HomeComponent,
    EventComponent,
    EventDaysComponent,
    EventDayComponent
  ],
  imports: [
    CoreModulesModule
  ],
  exports: [HomeComponent, EventComponent, EventDaysComponent]
})
export class HomeModule { }
