import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from "../../../../shared/services/event/event.service";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EventDay } from 'src/app/shared/model/EventDay';

@Component({
  selector: 'app-event-days',
  templateUrl: './event-days.component.html',
  styleUrls: ['./event-days.component.scss']
})
export class EventDaysComponent implements OnInit {

  eventId: string;
  event = {
    name: "",
    category: "",
    description: ""
  }
  eventDays: EventDay[]
  errorMsg: string;

  constructor(private route:ActivatedRoute,
              private eventService:EventService,
              private router: Router) { 

    this.errorMsg = "";
  }

  ngOnInit() {

    this.eventId = this.route.snapshot.params['id'];

    this.eventService.getEventDays(this.eventId).subscribe((res) => {
      this.eventDays = res;
      this.event = res[0].event;
    },
    error => {
      this.router.navigate(['/']);
    })
  }
}