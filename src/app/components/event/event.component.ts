import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'event-component',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  @Input() event:any;

  constructor() { }

  ngOnInit() {
  }

}
