import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import {PageEvent} from '@angular/material/paginator';

import { SiteRoutes } from './../../shared/constants';
import {EventService} from "../../shared/services/event/event.service";
import { EventComponent } from '../event/event.component';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.scss' ]
})
export class HomeComponent implements OnInit, OnDestroy{

  data = {
    events: [],
    numberOfElements: 0
  }

  searchTerm: string = "";
  filter: {
    type: string,
    date: string,
    location: any
  }

  pagination = {
    pageSize: 5,
    pageSizeOptions: [5,10,25],
    pageIndex: 0
  }

  pageEvent: PageEvent;
  eventServiceGetEventsSub: Subscription;

  public constructor(
    private eventService: EventService
  ) {
  }

  ngOnInit() {
   this.fetchData(null);
  }

  ngOnDestroy() {
    this.eventServiceGetEventsSub.unsubscribe();
  }

  searchChangedCallback(event: any) {
    this.searchTerm = event;
    this.callFetch();
  }

  filterChangedCallback(event: any) {

    this.filter = event;
    this.callFetch();

  }

  callFetch() {
    if (this.pageEvent) {
      this.pageEvent.pageIndex = 0;
    }
    this.pageEvent = this.fetchData(this.pageEvent);
  }
  
  fetchData(event?:PageEvent) {
    this.pagination.pageIndex = event ? event.pageIndex : 0;
    this.eventServiceGetEventsSub = this.eventService.getEvents(this.pagination, this.searchTerm, this.filter).subscribe((res) => {
      this.data = res;
    })

    return event;
  }
}
