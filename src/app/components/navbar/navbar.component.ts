import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService, AuthQuery } from 'src/app/shared/store';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {


  loggedIn: boolean;
  role: string;
  admin: boolean;

  isLoggedInSub: Subscription;
  roleSub: Subscription;
  isAdminInSub: Subscription;


  constructor(private auth: AuthService,
              private router: Router,
              private authQuery: AuthQuery
  ) {}

  ngOnInit() {
    this.isLoggedInSub = this.authQuery.isLoggedIn$.subscribe((isLoggedIn) => {
      this.loggedIn = isLoggedIn;
    });

    this.roleSub = this.authQuery.role$.subscribe((role) => {
      this.role = role;
    })

    this.isAdminInSub = this.authQuery.isAdmin$.subscribe((admin) => {
      this.admin = admin
    })
  }

  ngOnDestroy() {
    this.isLoggedInSub.unsubscribe();
    this.roleSub.unsubscribe();
    this.isAdminInSub.unsubscribe();
  }

  isAdmin() {
    return this.role === "ROLE_ADMIN";
  }

  isUser() {
    return this.role === "ROLE_REGISTERED";
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/'])
  }

  isRegistrationPage() {
    return this.router.url === "/register";
  }

  isLoginPage() {
    return this.router.url === "/login";
  }
}
