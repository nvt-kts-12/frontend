import {Component, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

@Component({
  selector: 'snackbar',
  templateUrl: './snackbar.component.html',
  styles: [`#snackbar {
    color: white;
  }`]
})
export class SnackbarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }
}