import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoggedOutGuard } from './../../router/guards/logged-out.guard'
// import { RegisterComponent } from './register/register.component';

export const accountRouting: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [ LoggedOutGuard ]
  },
  // TODO: it will be implemented after MVP
  // { path: 'register', component: RegisterComponent },
];
