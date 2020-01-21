import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { accountRouting } from '../components/account/account.routing';
import { LoggedInGuard } from './guards/logged-in.guard';
import { RegisterComponent } from '../components/account/register/register.component';
import { LoginComponent } from '../components/account/login/login.component';
import { EventDaysComponent } from '../components/event-days/event-days.component';
import { UserProfileComponent } from '../components/user-profile/user-profile.component';
import { EditProfileComponent } from '../components/edit-profile/edit-profile.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    // canActivate: [ LoggedInGuard ]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'event/:id',
    component: EventDaysComponent
  },
  {
    path:'profile',
    component: UserProfileComponent,
    canActivate: [ LoggedInGuard ]
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent,
    canActivate: [ LoggedInGuard ]
  },
  ...accountRouting
];
