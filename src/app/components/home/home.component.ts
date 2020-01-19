import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
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

  searchTerm: string = "";
  searchChanged: Subject<string> = new Subject<string>();
  pageEvent: PageEvent;

  public constructor(
    private eventService: EventService
  ) {
    this.searchChanged.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(term => {
      this.searchTerm = term;
      if (this.pageEvent) {
        this.pageEvent.pageIndex = 0;
      }

      this.pageEvent = this.fetchData(this.pageEvent);
    })
  }

  ngOnInit() {
   this.fetchData(null);
  }

  search(text: string) {
    this.searchChanged.next(text);
  }
  
  fetchData(event?:PageEvent) {
    this.pagination.pageIndex = event ? event.pageIndex : 0;
    this.eventService.getEvents(this.pagination, this.searchTerm).subscribe((res) => {
      this.data = res;
    })

    return event;
  }
}
