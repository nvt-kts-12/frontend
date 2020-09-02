import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/store';
import { UserService } from 'src/app/shared/services/user/user.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from 'src/app/components/common/snackbar/snackbar.component';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  user : User
  test : any 
 
  constructor(private userService : UserService,
              private router: Router,private snackbar: MatSnackBar) { 
  }

  ngOnInit() {
    this.test =JSON.parse(localStorage.getItem("AkitaStores"))
    this.user = this.test.auth.user 
  }

  update(): void{
    this.userService.update(this.user).subscribe(
      res => {
        this.router.navigate(["/profile"]);
        this.showSnackbarSuccess("You have successfully updated your profile")
      },
      error => {
        this.showSnackbarError("Email format not valid")
      }
    )
  }

  showSnackbarSuccess(message) {
    this.snackbar.openFromComponent(SnackbarComponent, {
      data: message,
      panelClass: ['snackbar-success']
    });
  }

  showSnackbarError(message) {
    this.snackbar.openFromComponent(SnackbarComponent, {
      data: message,
      panelClass: ['snackbar-error']
    });
  }

 
}
