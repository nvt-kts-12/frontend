import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/shared/services/event/event.service';
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from '../../common/snackbar/snackbar.component';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent implements OnInit {

  eventId:string = '';

  event = {
    name: '',
    description: '',
    category: ''
  }

  eventDays: any[];

  categories: string[] = ["SPORT", "CULTURAL", "ENTERTAINMENT"];

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.eventId = this.route.snapshot.params['id'];
    this.eventService.getEventDays(this.eventId).subscribe(response => {
      this.event = response[0].event;
      this.eventDays = response;
    })
  }

  saveChangesEnabled() {
    return this.event.name.length > 0 && this.event.description.length > 0;
  }

  saveChanges() {
    this.eventService.updateEvent(this.eventId, this.event).subscribe(response => {
      this.snackbar.openFromComponent(SnackbarComponent, {
        data: "You have successfully edited the event.",
        panelClass: ['snackbar-success']
      });
    }, 
      error => {
        this.snackbar.openFromComponent(SnackbarComponent, {
        data: error.message,
        panelClass: ['snackbar-error']
      });
    });
  }
}
