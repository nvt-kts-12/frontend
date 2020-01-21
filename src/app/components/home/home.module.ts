import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { CoreModulesModule } from './../../shared/components/core.module';
import { EventComponent } from '../event/event.component';
import { EventDaysComponent } from '../event-days/event-days.component';
import { EventDayComponent } from '../event-day/event-day.component';
import { SearchComponent } from '../common/search/search.component';
import { FilterComponent } from '../filter/filter.component';
import { DatePipe } from '@angular/common';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    HomeComponent,
    EventComponent,
    EventDaysComponent,
    EventDayComponent,
    SearchComponent,
    FilterComponent,
    UserProfileComponent,
    EditProfileComponent
  ],
  imports: [
    CoreModulesModule
  ],
  providers: [
    DatePipe
  ],
  exports: [HomeComponent, EventComponent, EventDaysComponent]
})
export class HomeModule { }
