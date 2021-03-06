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
    Validators.required,
    Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$')
  ]);
  public firstName = new FormControl('', [
    Validators.required
  ]);
  public lastName = new FormControl('', [
    Validators.required
  ]);
  public email = new FormControl('', [
    Validators.required,
		Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')
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
    else if (this[fieldName].hasError('pattern')){
      return `VALIDATION.${fieldName.toUpperCase()}_NOT_VALID`;
    }   
    return '';
  }

}
