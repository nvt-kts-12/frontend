import { NgModule } from '@angular/core';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { TicketComponent } from './user-profile/tickets/tickets.component';
import { CoreModulesModule } from 'src/app/shared/components/core.module';
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
})
export class UserModule { }
