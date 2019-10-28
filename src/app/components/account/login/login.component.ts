import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

import { AuthService } from './../../../shared/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.scss' ]
})

export class LoginComponent {
  public email = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  public password = new FormControl('', [
    Validators.required
  ]);

  public constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  /**
   * Submits form to the server
   * @method onSubmit
   * @returns void
   */
  onSubmit(): void {
    if (!this.email.valid || !this.password.valid) {
      return;
    }

    this.authService.login({
      email: this.email.value,
      password: this.password.value
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

    if (this[fieldName].hasError('email'))  {
      return 'VALIDATION.EMAIL_NOT_VALID';
    }

    return '';
  }
}
