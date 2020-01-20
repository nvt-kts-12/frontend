import { Component, OnInit } from '@angular/core';
import { AuthStore, User } from 'src/app/shared/store';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  private authStore : AuthStore
  private user : User
  private test : any 
  
  constructor() { }

  ngOnInit() {
    this.test =JSON.parse(localStorage.getItem("AkitaStores"))
    this.user = this.test.auth.user
  }



}
