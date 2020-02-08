import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from 'src/app/components/common/snackbar/snackbar.component';

import { AuthService } from './../../../shared/store';
import { filter } from 'rxjs/operators';
import { PreviousRouteService } from 'src/app/shared/services/route/previousRouteService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.scss']
})

export class LoginComponent {

  public username = new FormControl('', [
    Validators.required
  ]);
  public password = new FormControl('', [
    Validators.required
  ]);

  public constructor(
    private authService: AuthService,
    private router: Router,
    private previousRouteService: PreviousRouteService
  ) {
  }

  /**
   * Submits form to the server
   * @method onSubmit
   * @returns void
   */

  onSubmit(): void {

    console.log(this.username);
    if (!this.username.valid || !this.password.valid) {
      return;
    }

    this.authService.login({
      username: this.username.value,
      password: this.password.value
    }).subscribe(() => {
      let path = this.previousRouteService.getPreviousUrl();
      if(path!='/login'){
        this.router.navigate([path]);
      }else{
        this.router.navigate(['/']);
      }
    });
  }

  /**
   * Get error message
   * @method getErrorMessage
   * @param fieldName
   * @returns string
   */
  getErrorMessage(fieldName) {
    if (this[fieldName].hasError('required')) {
      return `VALIDATION.${fieldName.toUpperCase()}_REQUIRED`;
    }
    return '';
  }

}
