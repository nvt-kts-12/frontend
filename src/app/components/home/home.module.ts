import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { CoreModulesModule } from './../../shared/components/core.module';
import { EventComponent } from '../event/event.component';
import { EventDaysComponent } from '../event-days/event-days.component';
import { EventDayComponent } from '../event-day/event-day.component';
import { TicketReservationComponent } from '../ticket-reservation/ticket-reservation.component';
import { PopupDialogComponent } from '../popup-dialog/popup-dialog.component';


@NgModule({
  declarations: [
    HomeComponent,
    EventComponent,
    EventDaysComponent,
    EventDayComponent,
    TicketReservationComponent,
    PopupDialogComponent
  ],
  imports: [
    CoreModulesModule
  ],
  exports: [HomeComponent, EventComponent, EventDaysComponent, TicketReservationComponent],
  entryComponents:[PopupDialogComponent]
})
export class HomeModule { }
