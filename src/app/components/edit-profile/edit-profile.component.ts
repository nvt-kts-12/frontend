import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/store';
import { EditProfileService } from 'src/app/shared/services/user-profile/edit-profile.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  private user : User
  private test : any 
  editprofileService : EditProfileService
  router: any;
 
  constructor(editprofileService : EditProfileService) { 
    this.editprofileService = editprofileService
  }

  ngOnInit() {
    this.test =JSON.parse(localStorage.getItem("AkitaStores"))
    this.user = this.test.auth.user 
  }

  update(): void{
    this.editprofileService.update(this.user)
  }

  

 
}
