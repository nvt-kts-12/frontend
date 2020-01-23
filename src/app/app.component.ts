import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from './components/common/snackbar/snackbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit{
  title = 'my-app';

  constructor(private translate: TranslateService, private snackbar: MatSnackBar) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit() {
  }

  showSnack() {
  // panelClass: snackbar-error / snackbar-success
  // data: message 
    this.snackbar.openFromComponent(SnackbarComponent, {
      data: "snackbar", 
      panelClass: ['snackbar-error'],
    });
  }
}
