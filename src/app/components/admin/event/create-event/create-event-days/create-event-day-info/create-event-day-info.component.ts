import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-create-event-day-info',
  templateUrl: './create-event-day-info.component.html',
  styleUrls: ['./create-event-day-info.component.scss']
})
export class CreateEventDayInfoComponent implements OnInit {

  @Input() 
  name: string; 
  @Input() 
  description: string; 
  @Input() 
  category: string; 

  constructor() { }

  ngOnInit() {
  }

}
