import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from "../../shared/services/event/event.service";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-days',
  templateUrl: './event-days.component.html',
  styleUrls: ['./event-days.component.scss']
})
export class EventDaysComponent implements OnInit {

  eventId: string;
  event: any;
  eventDays: []
  errorMsg: string;

  constructor(private route:ActivatedRoute,
              private eventService:EventService,
              private router: Router) { 

    this.eventId = route.snapshot.params['id'];

    this.event = {
      name: "",
      category: "",
      description: ""
    }

    this.errorMsg = "";
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {

    this.eventService.getEventDays(this.eventId).subscribe((res) => {
      this.eventDays = res;
      this.event = res[0].event;
    },
    error => {
      this.router.navigate(['/']);
    })

  }

}