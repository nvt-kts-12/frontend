import { Component, OnInit } from '@angular/core';
import { AuthStore, User, AuthQuery } from 'src/app/shared/store';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
   user : Partial<User>
   test : any 
  
  constructor(public authQuery: AuthQuery) { }

  ngOnInit() {
    this.authQuery.user$.subscribe((user) => {
      this.user = user;
    })
  }



}
