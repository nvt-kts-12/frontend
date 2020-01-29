import { Component, OnInit, ViewChild } from '@angular/core';
import { CreateLocationSectorsComponent } from './create-location-sectors/create-location-sectors.component';
import { LocationSchemeInfoComponent } from './location-scheme-info/location-scheme-info.component';
import { LocationSchemeService } from 'src/app/shared/services/location-scheme/location-scheme.service';
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from '../../common/snackbar/snackbar.component';
import { Router } from '@angular/router';
import { SiteRoutes } from 'src/app/shared/constants';

@Component({
  selector: 'app-create-location-scheme',
  templateUrl: './create-location-scheme.component.html',
  styleUrls: ['./create-location-scheme.component.scss']
})
export class CreateLocationSchemeComponent implements OnInit {

  @ViewChild(CreateLocationSectorsComponent)
  sectorsComponent: CreateLocationSectorsComponent;

  @ViewChild(LocationSchemeInfoComponent)
  infoComponent: LocationSchemeInfoComponent;


  constructor(
    private locationSchemeService: LocationSchemeService, 
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {

  }


  createScheme() {
    
    if (this.valid()) {
      let scheme = {
        locationScheme: this.infoComponent.getInfo(),
        sectors: this.sectorsComponent.returnSectors()
      }

      this.locationSchemeService.createLocationScheme(scheme).subscribe(response => {
        this.snackbar.openFromComponent(SnackbarComponent, {
          data: "You have successfully created a new location scheme",
          panelClass: ['snackbar-success']
        });
        this.router.navigate([SiteRoutes.ADMIN]);
      });
    } 
  }

  valid() {
    let valid:boolean = true;

    if (!this.infoComponent.name.valid || !this.infoComponent.address.valid) {
      this.showSnackbarError("You must fill out all of the fields.")
      valid = false;
    } else if (this.sectorsComponent.sectorsForRequest.length == 0) {
      this.showSnackbarError("You must draw at least one sector.")
      valid = false;
    }

    return valid;
  }

  showSnackbarError(message) {
    this.snackbar.openFromComponent(SnackbarComponent, {
      data: message,
      panelClass: ['snackbar-error']
    });
  }
}
