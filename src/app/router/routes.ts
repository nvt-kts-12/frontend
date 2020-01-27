import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { accountRouting } from '../components/account/account.routing';
import { LoggedInGuard } from './guards/logged-in.guard';
import { RegisterComponent } from '../components/account/register/register.component';
import { LoginComponent } from '../components/account/login/login.component';
import { EventDaysComponent } from '../components/event-days/event-days.component';
import { TicketReservationComponent } from '../components/ticket-reservation/ticket-reservation.component';
import { UserProfileComponent } from '../components/user-profile/user-profile.component';
import { EditProfileComponent } from '../components/edit-profile/edit-profile.component';
import { AdminGuard } from './guards/admin-guard';
import { NotAdminGuard } from './guards/not-admin-guard';
import { AdminPageComponent } from '../components/admin/admin-page/admin-page.component';
import { CreateEventComponent } from '../components/admin/create-event/create-event.component';
import { CreateEventDaysComponent } from '../components/admin/create-event/create-event-days/create-event-days.component';
import { CreateLocationSchemeComponent } from '../components/admin/create-location-scheme/create-location-scheme.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    // canActivate: [ LoggedInGuard ]
    canActivate: [AdminGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'event/:id',
    component: EventDaysComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'event/:eventId/event-day/:dayId',
    component: TicketReservationComponent
  },
  {
    path: 'admin',
    component: AdminPageComponent,
    canActivate: [NotAdminGuard]
  },
  {
    path: 'create-event',
    component: CreateEventComponent,
    canActivate: [NotAdminGuard]
  },
  {
    path: 'create-event-days',
    component: CreateEventDaysComponent,
    canActivate: [NotAdminGuard]
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
  {
    path: 'create-location-scheme',
    component: CreateLocationSchemeComponent,
    canActivate: [NotAdminGuard]
  },
  ...accountRouting
];
