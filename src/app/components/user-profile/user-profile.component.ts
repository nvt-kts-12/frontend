import { Component, OnInit } from '@angular/core';
import { AuthStore, User, AuthQuery } from 'src/app/shared/store';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  private user : Partial<User>
  private test : any 
  
  constructor(private authQuery: AuthQuery) { }

  ngOnInit() {
    this.authQuery.user$.subscribe((user) => {
      this.user = user;
    })
  }



}
