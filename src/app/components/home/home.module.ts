import { NgModule } from '@angular/core';
import { EventViewModule } from './event-view/event-view.module';
import { EventReservationModule } from './event-reservation/event-reservation.module';

@NgModule({
  imports: [
    EventViewModule,
    EventReservationModule
  ],
})
export class HomeModule { }
