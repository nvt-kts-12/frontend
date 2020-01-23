import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/store';
import { EditProfileService } from 'src/app/shared/services/user/user.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  user : User
  test : any 
 
  constructor(private editprofileService : EditProfileService,
              private router: Router) { 
  }

  ngOnInit() {
    this.test =JSON.parse(localStorage.getItem("AkitaStores"))
    this.user = this.test.auth.user 
  }

  update(): void{
    this.editprofileService.update(this.user).subscribe(
      res => {
        this.router.navigate(["/profile"]);
        // TODO SNACKBAR        
      },
      error => {
        console.log("error");
        // TODO SNACKBAR
      }
    )
  }

  

 
}
