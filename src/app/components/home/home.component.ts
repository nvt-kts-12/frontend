import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { SiteRoutes } from './../../shared/constants';
import { AuthService, AuthQuery, User } from './../../shared/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.scss' ]
})
export class HomeComponent {

  /**
   * Holds current active user
   * @type User
   */
  public currentUser$: Observable<Partial<User>>;

  /**
   * Is logged in user
   * @type boolean
   */
  public isLoggedIn: boolean;

  constructor(
    private authQuery: AuthQuery,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentUser$ = this.authQuery.user$;
    this.authQuery.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  /**
   * Navigates user to the login page
   * @returns void
   */
  goToLogin(): void {
    this.router.navigate([SiteRoutes.LOGIN]);
  }

  /**
   * Logout user
   * @returns void
   */
  logout(): void {
    this.authService.logout();
  }
}
