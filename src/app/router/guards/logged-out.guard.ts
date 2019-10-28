import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthQuery } from './../../shared/store';
import { SiteRoutes } from './../../shared/constants';

@Injectable()
export class LoggedOutGuard implements CanActivate {
  constructor(
    private authQuery: AuthQuery,
    private router: Router
  ) {}

  /**
   * Check is user logged in, if he is logged in
   * redirect him back to home
   * logged in user can't activate route protected by this guard
   * @param next {ActivatedRouteSnapshot}
   * @param state {RouterStateSnapshot}
   * @returns boolean
   */
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return Observable.create((observer) => {
      this.authQuery.isLoggedIn$.subscribe((isLoggedIn) => {
        if (isLoggedIn) {
          this.router.navigate([SiteRoutes.HOME]);
        }
        observer.next(!isLoggedIn);
      });
    });
  }
}
