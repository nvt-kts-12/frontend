import { NgModule } from '@angular/core';
import { CoreModulesModule } from './../../shared/components/core.module';
import { UserProfileComponent } from './user-profile.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { TicketComponent } from './tickets/tickets.component';
import { CommonComponentsModule } from '../common/common-components.module';

@NgModule({
  declarations: [
    UserProfileComponent,
    EditProfileComponent,
    TicketComponent
  ],
  imports: [
    CoreModulesModule,
    CommonComponentsModule
  ],
  exports: [UserProfileComponent]
})
export class UserProfileModule { }
