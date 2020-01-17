import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/store';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  logout() {
    this.auth.logout();
  }

  show() {
    this.auth.showUser().subscribe(() => console.log("SHOW"));
  }

}
