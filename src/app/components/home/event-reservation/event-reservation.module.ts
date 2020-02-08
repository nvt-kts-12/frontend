import { NgModule } from '@angular/core';
import { TicketReservationComponent } from '../../user/ticket-reservation/ticket-reservation.component';
import { ParterPopupComponent } from './parter-popup/parter-popup.component';
import { SectorComponent } from './sector/sector.component';
import { GrandstandPopupComponent } from './grandstand-popup/grandstand-popup.component';
import { PayPalComponent } from './pay-pal/pay-pal.component';
import { CoreModulesModule } from 'src/app/shared/components/core.module';
import { CommonComponentsModule } from '../../common/common-components.module';


@NgModule({
  declarations: [
    TicketReservationComponent,
    ParterPopupComponent,
    SectorComponent,
    GrandstandPopupComponent,
    PayPalComponent,
  ],
  imports: [
    CoreModulesModule,
    CommonComponentsModule
  ]
})
export class EventReservationModule { }
