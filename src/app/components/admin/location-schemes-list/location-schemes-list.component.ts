import { Component, OnInit } from '@angular/core';
import { LocationSchemeService } from 'src/app/shared/services/location-scheme/location-scheme.service';

@Component({
  selector: 'app-location-schemes-list',
  templateUrl: './location-schemes-list.component.html',
  styleUrls: ['./location-schemes-list.component.scss']
})
export class LocationSchemesListComponent implements OnInit {

  locationSchemes: any[] = [];

  constructor(private locationSchemeService: LocationSchemeService) { }

  ngOnInit() {
    this.locationSchemeService.getLocationSchemes().subscribe(response => {
      this.locationSchemes = response
      console.log(this.locationSchemes);
    });
  }



}
