import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material';
import { formatDate } from '@angular/common';
import { ChooseSectorsComponent } from './choose-sectors/choose-sectors.component';
import { MatSelectChange } from '@angular/material';

@Component({
  selector: 'app-create-event-day',
  templateUrl: './create-event-day.component.html',
  styleUrls: ['./create-event-day.component.scss']
})
export class CreateEventDayComponent implements OnInit {

  @Input()
  date: string;

  @Input()
  locations: any[];

  @ViewChild(ChooseSectorsComponent) 
  chooseSectors: ChooseSectorsComponent;

  format:string = 'yyyy-MM-dd';
  locale:string = 'en-US';
  expirationDate:string;

  locationSchemeId:string = null;

  locationSectors:any = null;

  today = new Date();

  constructor() { }

  ngOnInit() {
  }

  setExpirationDate(date: MatDatepickerInputEvent<Date>) {
    let formattedDate = formatDate(date.value, this.format, this.locale);
    this.expirationDate = formattedDate;
  }

  locationPicked() {
    return this.locationSchemeId !== null;
  }

  onChange(changeEvent: MatSelectChange) {
    this.locationSchemeId = changeEvent.value;
    this.renderNewLocationScheme(changeEvent.value);
  }

  
  renderNewLocationScheme(schemeId) {
    this.chooseSectors.getLocationScheme(schemeId);
  }

  getLocationSectors() {
    this.locationSectors = this.chooseSectors.returnLocationSectors();
  }

  returnEventDayData() {

    this.getLocationSectors();

    return {
      date: this.date,
      reservationExpireDate: this.expirationDate,
      location: {
        locationSchemeId: this.locationSchemeId,
        locationSectors: this.locationSectors
      }
    }
  }

  allPricesFilledOut() {
    let result = true;
    this.chooseSectors.selectedSectors.forEach(selectedSector => {
      if (this.chooseSectors.sectorPrices[selectedSector.id] === undefined) {
        result = false;
      }
    });
    return result;
  }

  allCapacitiesFilledOut() {
    let result = true;
    this.chooseSectors.selectedSectors.forEach(selectedSector => {
      if (this.chooseSectors.sectorCapacities[selectedSector.id] === undefined) {
        result = false;
      }
    });
    return result;
  }

  noSectorsPicked() {
    return this.chooseSectors.selectedSectors.length == 0;
  }
}
