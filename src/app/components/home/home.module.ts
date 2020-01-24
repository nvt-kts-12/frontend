import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { CoreModulesModule } from './../../shared/components/core.module';
import { EventComponent } from '../event/event.component';
import { EventDaysComponent } from '../event-days/event-days.component';
import { EventDayComponent } from '../event-day/event-day.component';
import { TicketReservationComponent } from '../ticket-reservation/ticket-reservation.component';
import { ParterPopupComponent } from '../parter-popup/parter-popup.component';
import { SearchComponent } from '../common/search/search.component';
import { FilterComponent } from '../filter/filter.component';
import { DatePipe } from '@angular/common';
import { SectorComponent } from '../sector/sector.component';
import { GrandstandPopupComponent } from '../grandstand-popup/grandstand-popup.component';

@NgModule({
  declarations: [
    HomeComponent,
    EventComponent,
    EventDaysComponent,
    SearchComponent,
    FilterComponent,
    EventDayComponent,
    TicketReservationComponent,
    ParterPopupComponent,
    SectorComponent,
    GrandstandPopupComponent
  ],
  imports: [
    CoreModulesModule
  ],
  providers: [
    DatePipe
  ],
  exports: [HomeComponent, EventComponent, EventDaysComponent, TicketReservationComponent],
  entryComponents:[ParterPopupComponent, GrandstandPopupComponent]
})
export class HomeModule { }
