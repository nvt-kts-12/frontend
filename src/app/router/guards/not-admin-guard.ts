import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthQuery } from './../../shared/store';
import { SiteRoutes } from './../../shared/constants';

@Injectable()
export class NotAdminGuard implements CanActivate {
  constructor(
    private authQuery: AuthQuery,
    private router: Router
  ) {}

  /**
   * Check if user is an admin in, if he is
   * redirect him to admin page 
   * @param next {ActivatedRouteSnapshot}
   * @param state {RouterStateSnapshot}
   * @returns boolean
   */
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return Observable.create((observer) => {
      this.authQuery.isAdmin$.subscribe((isAdmin) => {
        if (!isAdmin) {
          this.router.navigate([SiteRoutes.HOME]);
        }
        observer.next(isAdmin);
      });
    });
  }
}