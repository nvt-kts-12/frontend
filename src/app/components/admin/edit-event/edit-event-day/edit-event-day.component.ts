import { Component, OnInit, Input } from '@angular/core';
import { formatDate } from '@angular/common';
import { MatDatepickerInputEvent, MatSnackBar } from '@angular/material';
import { EventService } from 'src/app/shared/services/event/event.service';
import { SnackbarComponent } from 'src/app/components/common/snackbar/snackbar.component';

@Component({
  selector: 'app-edit-event-day',
  templateUrl: './edit-event-day.component.html',
  styleUrls: ['./edit-event-day.component.scss']
})
export class EditEventDayComponent implements OnInit {

  @Input()
  eventDay: any;

  states: string[] = ["NOT_IN_SALE", "RESERVABLE_AND_BUYABLE", "ONLY_BUYABLE", "SOLD_OUT", "CANCELLED"];

  format:string = 'yyyy-MM-dd';
  locale:string = 'en-US';

  today:Date = new Date();
  eventDayDateError: boolean = false;
  reservationExpirationError: boolean = false;

  maxDateForExpiration = new Date();

  constructor(
    private eventService: EventService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.maxDateForExpiration = this.eventDay.date;
  }

  setEventDayDate(date: MatDatepickerInputEvent<Date>) {
    if(date.value != null) {
      this.maxDateForExpiration = date.value;
      let formattedDate = formatDate(date.value, this.format, this.locale);
      this.eventDay.date = formattedDate;
      this.eventDayDateError = false;
    } else {
      this.eventDayDateError = true;
    }
    
  }

  setReservationExpirationDate(date: MatDatepickerInputEvent<Date>) {
    if(date.value != null) {
      let formattedDate = formatDate(date.value, this.format, this.locale);
      this.eventDay.reservationExpireDate = formattedDate;
      this.reservationExpirationError = false;
    } else {
      this.reservationExpirationError = true;
    }
  }

  saveChanges() {
    let eventDayUpdateData = {
      date: this.eventDay.date,
      reservationExpirationDate: this.eventDay.reservationExpireDate,
      eventDayState: this.eventDay.eventDayState
    }
    this.eventService.updateEventDay(this.eventDay.id, eventDayUpdateData).subscribe(response => {
        this.snackbar.openFromComponent(SnackbarComponent, {
          data: "You have successfully edited the event day",
          panelClass: ['snackbar-success']
        })
      }, 
      error => {
        this.snackbar.openFromComponent(SnackbarComponent, {
        data: error.message,
        panelClass: ['snackbar-error']
      });
    });
  }

  saveChangesEnabled() {
    return !this.eventDayDateError && !this.reservationExpirationError;
  }

}
