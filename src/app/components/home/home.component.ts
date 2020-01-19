import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {PageEvent} from '@angular/material/paginator';

import { SiteRoutes } from './../../shared/constants';
import {EventService} from "../../shared/services/event/event.service";
import { EventComponent } from '../event/event.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.scss' ]
})
export class HomeComponent implements OnInit{

  data = {
    events: [],
    numberOfElements: 0
  }

  pagination = {
    pageSize: 5,
    pageSizeOptions: [5,10,25],
    pageIndex: 0
  }

  searchQuery: string = "";
  pageEvent: PageEvent;

  public constructor(
    private eventService: EventService
  ) {}

  ngOnInit() {
   this.fetchData(null);
  }
  
  fetchData(event?:PageEvent) {
    // fetch data
    this.pagination.pageIndex = event ? event.pageIndex : 0;
    this.eventService.getEvents(this.pagination, this.searchQuery).subscribe((res) => {
      this.data = res;
    })

    return event;
  }
}
