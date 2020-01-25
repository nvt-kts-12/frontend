import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { DatePipe } from '@angular/common'
import { LocationSchemeService } from 'src/app/shared/services/location-scheme/location-scheme.service';
import { MatSelectChange } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {
  

  @Output() onChange = new EventEmitter();

  eventType: string = 'All';
  eventTypes: string[] = ['All', 'Sport', 'Cultural', 'Entertainment'];

  filter: {
    type: string,
    date: any,
    location: string
  }

  locationSchemes: [];

  getLocationSchemeSub: Subscription;

  constructor(public datepipe: DatePipe,
              public locationSchemeService: LocationSchemeService) {
    this.filter ={
      type: '',
      date: '',
      location: ''
    }
   }

  ngOnInit() {
    // fetch locations
    this.getLocationSchemeSub = this.locationSchemeService.getLocationSchemes().subscribe((res) => {
      this.locationSchemes = res;
    })
    
  }

  ngOnDestroy(): void {
    this.getLocationSchemeSub.unsubscribe();
  }

  typeChanged(e) {
    this.filter.type = this.eventType === "All" ? "" : this.eventType;
    this.emitAction();
  }

  dateChanged(e: MatDatepickerInputEvent<Date>) {
    let date = this.datepipe.transform(e.value, 'yyyy-MM-dd');
    this.filter.date = date ? date.toString() : "";
    this.emitAction();
  }

  locationChanged(e: MatSelectChange) {
    this.filter.location = e.value === undefined ? null : e.value;
    this.emitAction();
  }

  clearDate() {
    this.filter.date = "";

    this.emitAction();
  }

  emitAction() {
    this.onChange.emit(this.filter);
  }

  

}
