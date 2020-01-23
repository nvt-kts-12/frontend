import { Component, OnInit } from '@angular/core';
import { AuthService, AuthQuery } from 'src/app/shared/store';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  loggedIn: boolean;
  role: string;
  admin: boolean;

  constructor(private auth: AuthService,
              private router: Router,
              private authQuery: AuthQuery
  ) {

    this.authQuery.isLoggedIn$.subscribe((isLoggedIn) => {
      this.loggedIn = isLoggedIn;
    });

    this.authQuery.role$.subscribe((role) => {
      this.role = role;
    })

    this.authQuery.isAdmin$.subscribe((admin) => {
      this.admin = admin
    })
   }

  ngOnInit() {
    
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
