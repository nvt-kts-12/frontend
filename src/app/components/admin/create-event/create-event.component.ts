import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDatepickerInputEvent, MatDatepicker, MatInput, MatSnackBar } from '@angular/material';
import { formatDate } from '@angular/common';
import { FormControl, Validators } from '@angular/forms';
import { CreateEventStore } from '../../../shared/store/create-event/create-event.store';
import { SnackbarComponent } from '../../common/snackbar/snackbar.component';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
  dates: string[] = [];
  format:string = 'yyyy-MM-dd';
  locale:string = 'en-US';
  categories:string[] = ['SPORT', 'CULTURAL', 'ENTERTAINMENT'];

  name = new FormControl('', [
    Validators.required
  ]);

  description = new FormControl('', [
    Validators.required
  ]);

  category = new FormControl('', [
    Validators.required
  ])

  today = new Date();

  @ViewChild('dateInput', {
    read: MatInput
  }) dateInput: MatInput;

  constructor(
    private router: Router,
    private createEventStore: CreateEventStore,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  addDate(date: MatDatepickerInputEvent<Date>) {
    let formattedDate = formatDate(date.value, this.format, this.locale);
    if (!this.datePicked(formattedDate)){
      this.dates.push(formattedDate);
    } else {
      this.snackbar.openFromComponent( SnackbarComponent, {
        data: "Date is already added!",
        panelClass: ['snackbar-error']
      });
    }
    this.dateInput.value = '';
  }

  datePicked(date: string):boolean {
    return this.dates.includes(date);
  }

  datesPicked() {
    return this.dates.length > 0;
  }

  removeDate(date: string) {
    this.dates = this.dates.filter(dateFromList => dateFromList !== date);
  }

  goToNextStep() { 
    this.createEventStore.updateRoot((state) => ({
      event: {
        name: this.name.value,
        description: this.description.value,
        category: this.category.value,
        dates: this.dates
      }
    }));
    this.router.navigate(['/admin/create-event-days']);
  }

  getErrorMessage(fieldName) {
    if (this[fieldName].hasError('required'))  {
      return `VALIDATION.EVENT_${fieldName.toUpperCase()}_REQUIRED`;
    }
    return '';
  }
}
