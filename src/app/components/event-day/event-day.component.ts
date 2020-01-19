import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-event-day',
  templateUrl: './event-day.component.html',
  styleUrls: ['./event-day.component.scss']
})
export class EventDayComponent implements OnInit {

  @Input() eventDay: any

  displayedColumns: string[] = ['type', 'price', 'vip'];

  constructor() { }

  continue() {
    console.log("continue");
    console.log(this.eventDay);
  }

  ngOnInit() {
  }

}
