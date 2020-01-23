import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { LoggedInGuard } from './guards/logged-in.guard';
import { LoggedOutGuard } from './guards/logged-out.guard';
import { AdminGuard } from './guards/admin-guard';
import { NotAdminGuard } from './guards/not-admin-guard';

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    LoggedInGuard,
    LoggedOutGuard,
    AdminGuard,
    NotAdminGuard
  ]
})
export class AppRoutingModule { }
