import { NgModule } from '@angular/core';
import { EventViewModule } from './event-view/event-view.module';
import { EventReservationModule } from './event-reservation/event-reservation.module';
import { GrandstandPopupComponent } from './event-reservation/grandstand-popup/grandstand-popup.component';
import { ParterPopupComponent } from './event-reservation/parter-popup/parter-popup.component';

@NgModule({
  imports: [
    EventViewModule,
    EventReservationModule
  ],
  entryComponents: [GrandstandPopupComponent, ParterPopupComponent]
})
export class HomeModule { }
