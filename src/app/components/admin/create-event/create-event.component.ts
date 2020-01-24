import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDatepickerInputEvent } from '@angular/material';
import { formatDate } from '@angular/common';
import { FormControl, Validators } from '@angular/forms';
import { CreateEventStore } from '../../../shared/store/create-event/create-event.store';

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

  // pickedCategory:string = '';

  category = new FormControl('', [
    Validators.required
  ])

  today = new Date();

  constructor(
    private router: Router,
    private createEventStore: CreateEventStore
  ) { }

  ngOnInit() {
  }

  goBackToMenu() {
    this.router.navigate(['/admin']);
  }

  addDate(date: MatDatepickerInputEvent<Date>) {
    let formattedDate = formatDate(date.value, this.format, this.locale);
    if (!this.datePicked(formattedDate)){
      this.dates.push(formattedDate);
    } else {
      //TODO: ovo treba da ide u snackbar
      alert('Date is already added!');
    }
    
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
    this.router.navigate(['/create-event-days']);
  }

  getErrorMessage(fieldName) {
    if (this[fieldName].hasError('required'))  {
      return `VALIDATION.EVENT_${fieldName.toUpperCase()}_REQUIRED`;
    }
    return '';
  }
}
