import { NgModule } from '@angular/core';

import { HomePageComponent } from './home-page/home-page.component';
import { EventComponent } from './event/event.component';
import { EventDayComponent } from './event-day/event-day.component';
import { FilterComponent } from './filter/filter.component';
import { EventDaysComponent } from './event-days/event-days.component';
import { CoreModulesModule } from 'src/app/shared/components/core.module';
import { CommonComponentsModule } from '../../common/common-components.module';

@NgModule({
  declarations: [
    HomePageComponent,
    EventComponent,
    EventDayComponent,
    FilterComponent,
    EventDaysComponent,
  ],
  imports: [
    CoreModulesModule,
    CommonComponentsModule
  ],
  exports: [HomePageComponent]
})
export class EventViewModule { }
