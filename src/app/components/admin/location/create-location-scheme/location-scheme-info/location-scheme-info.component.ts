import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-location-scheme-info',
  templateUrl: './location-scheme-info.component.html',
  styleUrls: ['./location-scheme-info.component.scss']
})
export class LocationSchemeInfoComponent implements OnInit {

  name = new FormControl('', [
    Validators.required
  ]);

  address = new FormControl('', [
    Validators.required
  ]);

  constructor() { }

  ngOnInit() {
  }

  getInfo() {
    return {
      name: this.name.value,
      address: this.address.value
    }
  }

  getErrorMessage(fieldName) {
    if (this[fieldName].hasError('required'))  {
      return `VALIDATION.LOCATION_${fieldName.toUpperCase()}_REQUIRED`;
    }
    return '';
  }

}
