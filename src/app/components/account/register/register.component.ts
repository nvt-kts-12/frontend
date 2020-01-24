import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../../../shared/store';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.scss' ]
})
export class RegisterComponent {
  title = 'Register';
  
  public username = new FormControl('', [
    Validators.required
  ]);
  public password = new FormControl('', [
    Validators.required
  ]);
  public firstName = new FormControl('', [
    Validators.required
  ]);
  public lastName = new FormControl('', [
    Validators.required
  ]);
  public email = new FormControl('', [
    Validators.required
  ]);
  

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  /**
   * Submit form to the server
   * @method onSubmit
   * @returns void
   */
  onSubmit(): void {
    this.authService.register({
      username: this.username.value,
      password: this.password.value,
      firstName : this.firstName.value,
      lastName : this.lastName.value,
      email: this.email.value  
    }).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

    /**
   * Get error message
   * @method getErrorMessage
   * @param fieldName
   * @returns string
   */
  getErrorMessage(fieldName) {
    if (this[fieldName].hasError('required'))  {
      return `VALIDATION.${fieldName.toUpperCase()}_REQUIRED`;
    }
    return '';
  }
}
