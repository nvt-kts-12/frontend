import { Component, OnInit, Input } from '@angular/core';
import { LocationSchemeService } from '../../../../../../shared/services/location-scheme/location-scheme.service';
import { MatCheckboxChange } from '@angular/material';

@Component({
  selector: 'app-choose-sectors',
  templateUrl: './choose-sectors.component.html',
  styleUrls: ['./choose-sectors.component.scss']
})
export class ChooseSectorsComponent implements OnInit {

  @Input()
  locationSchemeId:string;

  @Input()
  locationPicked: boolean;


  sectors: any[];

  selectedSectors: any[] = [];

  sectorPrices: Object = {}

  sectorCapacities: Object = {}

  vipSectors:string[] = [];

  locationSectors:any[] = [];

  invalid:string = "Invalid value"; 

  constructor(
    private locationSchemeService: LocationSchemeService
  ) { }

  ngOnInit() {
    if(this.locationPicked) {
      this.getLocationScheme(this.locationSchemeId);
    } 
  }

  getLocationScheme(schemeId) {
    this.selectedSectors = [];
    this.sectorPrices = {}
    this.vipSectors = [];
    this.locationSectors = [];

    this.locationSchemeService.getLocationSchemeSectors(schemeId).subscribe(response => {
      this.sectors = response;
    })
  }

  toggleSector(sector) {
    if(!this.selectedSectors.includes(sector)){
      this.selectedSectors.push(sector);
    } else {
      this.selectedSectors = this.selectedSectors.filter(sectorFromArray => sectorFromArray.id !== sector.id);
    }
  }

  isParter(sector) {
    return sector.type === "PARTER";
  }

  isGrandstand(sector) {
    return sector.type === "GRANDSTAND";
  }

  isAdded(sector) {
    return this.selectedSectors.includes(sector);
  }

  sectorsSelected() {
    return this.selectedSectors.length !== 0;
  }

  toggleSectorVip(checkEvent: MatCheckboxChange, sectorId) {
    if(checkEvent.checked) {
      this.vipSectors.push(sectorId);
    } else {
      this.vipSectors = this.vipSectors.filter(sectorIdFromList => sectorIdFromList !== sectorId);
    }
  }

  returnLocationSectors() {

    this.locationSectors = [];

    this.selectedSectors.forEach(pickedSector => {

      let lowerCapacity = Math.min(this.sectorCapacities[pickedSector.id], pickedSector.capacity);

      this.locationSectors.push({
        sectorId: pickedSector.id,
        price: this.sectorPrices[pickedSector.id],
        capacity: isNaN(lowerCapacity) ? "x" : Math.min(this.sectorCapacities[pickedSector.id], pickedSector.capacity),
        vip: this.vipSectors.includes(pickedSector.id)
      })
    });

    return this.locationSectors;
  }

  min(a, b) {
    if (a == undefined) {
      return 0;
    }
    return Math.min(a, b);
  }

  checkIfNaN(value) {
    return isNaN(value);
  }
}
