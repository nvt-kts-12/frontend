import { Routes } from '@angular/router';
import { accountRouting } from '../components/account/account.routing';
import { LoggedInGuard } from './guards/logged-in.guard';
import { RegisterComponent } from '../components/account/register/register.component';
import { LoginComponent } from '../components/account/login/login.component';
import { EventDaysComponent } from '../components/home/event-view/event-days/event-days.component';
import { TicketReservationComponent } from '../components/user/ticket-reservation/ticket-reservation.component';
import { UserProfileComponent } from '../components/user/user-profile/user-profile.component';
import { EditProfileComponent } from '../components/user/edit-profile/edit-profile.component';
import { AdminGuard } from './guards/admin-guard';
import { NotAdminGuard } from './guards/not-admin-guard';
import { AdminPageComponent } from '../components/admin/admin-page/admin-page.component';
import { CreateEventComponent } from '../components/admin/event/create-event/create-event.component';
import { CreateEventDaysComponent } from '../components/admin/event/create-event/create-event-days/create-event-days.component';
import { componentFactoryName } from '@angular/compiler';
import { ReportsComponent } from '../components/admin/reports/reports.component';
import { CreateLocationSchemeComponent } from '../components/admin/location/create-location-scheme/create-location-scheme.component';
import { PayPalComponent } from '../components/home/event-reservation/pay-pal/pay-pal.component';
import { EditEventComponent } from '../components/admin/event/edit-event/edit-event.component';
import { LocationSchemesListComponent } from '../components/admin/location/location-schemes-list/location-schemes-list.component';
import { EditLocationSchemeComponent } from '../components/admin/location/edit-location-scheme/edit-location-scheme.component';
import { HomePageComponent } from '../components/home/event-view/home-page/home-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
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
    path: 'admin/create-event',
    component: CreateEventComponent,
    canActivate: [NotAdminGuard]
  },
  {
    path: 'admin/create-event-days',
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
    path:'reports',
    component:ReportsComponent
  
  },
  {
    path: 'pay-pal',
    component: PayPalComponent,
    canActivate: [ LoggedInGuard ]
  },
  {
    path: 'admin/create-location-scheme',
    component: CreateLocationSchemeComponent,
    canActivate: [NotAdminGuard]
  },
  {
    path: 'admin/edit-events',
    component: HomePageComponent,
    canActivate: [NotAdminGuard]
  },
  {
    path: 'admin/edit-events/edit-event/:id',
    component: EditEventComponent,
    canActivate: [NotAdminGuard]
  },
  {
    path: 'admin/location-schemes-list',
    component: LocationSchemesListComponent,
    canActivate: [NotAdminGuard]
  },
  {
    path: 'admin/edit-location-scheme/:id',
    component: EditLocationSchemeComponent,
    canActivate: [NotAdminGuard]
  },
  ...accountRouting
];
