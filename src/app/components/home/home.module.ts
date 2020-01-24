import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { CoreModulesModule } from './../../shared/components/core.module';
import { EventComponent } from '../event/event.component';
import { EventDaysComponent } from '../event-days/event-days.component';
import { EventDayComponent } from '../event-day/event-day.component';
import { SearchComponent } from '../common/search/search.component';
import { FilterComponent } from '../filter/filter.component';
import { DatePipe } from '@angular/common';
import { UserProfileModule } from '../user-profile/user-profile.module';

@NgModule({
  declarations: [
    HomeComponent,
    EventComponent,
    EventDaysComponent,
    EventDayComponent,
    SearchComponent,
    FilterComponent,
  ],
  imports: [
    CoreModulesModule,
    UserProfileModule
  ],
  providers: [
    DatePipe
  ],
  exports: [HomeComponent, EventComponent, EventDaysComponent]
})
export class HomeModule { }
