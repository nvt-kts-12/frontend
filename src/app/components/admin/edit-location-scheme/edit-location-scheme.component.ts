import { Component, OnInit } from '@angular/core';
import { LocationSchemeService } from 'src/app/shared/services/location-scheme/location-scheme.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { SnackbarComponent } from '../../common/snackbar/snackbar.component';
import { ConfirmDialogComponent } from '../../common/confirm-dialog/confirm-dialog.component';
import { SiteRoutes } from 'src/app/shared/constants';

@Component({
  selector: 'app-edit-location-scheme',
  templateUrl: './edit-location-scheme.component.html',
  styleUrls: ['./edit-location-scheme.component.scss']
})
export class EditLocationSchemeComponent implements OnInit {

  locationSchemeId:string = '';

  locationScheme = {
    name: '',
    address: ''
  }

  sectors:any;

  constructor(
    private locationSchemeService: LocationSchemeService,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private confirmDialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.locationSchemeId = (this.route.snapshot.params['id']);

    this.locationSchemeService.getLocationScheme(this.locationSchemeId).subscribe(response => {
      this.locationScheme = response
    }, error => {
      console.log(error);
    });

    this.locationSchemeService.getLocationSchemeSectors(this.locationSchemeId).subscribe(response => {
      this.sectors = response
    }, error => {
      console.log(error);
    });
  }

  saveChanges() {
    let locationSchemeSectors = {
      locationScheme: this.locationScheme,
      sectors: this.sectors
    }

    this.locationSchemeService.updateLocationScheme(locationSchemeSectors).subscribe(response => {
      this.snackbar.openFromComponent(SnackbarComponent, {
        data: "Your changes have been saved",
        panelClass: ['snackbar-success']
      });
    }, error => {
      this.snackbar.openFromComponent(SnackbarComponent, {
        data: error.message,
        panelClass: ['snackbar-error']
      });
    });
  }

  saveEnabled() {
    return this.locationScheme.name.length > 0 && this.locationScheme.address.length > 0;
  }

  addressValid() {
    return this.locationScheme.address.length > 0;
  }

  nameValid() {
    return this.locationScheme.name.length > 0;
  }

  deleteLocationScheme() {
    const dialogRef = this.confirmDialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {
        title: "Confirm",
        message: "Are you sure you want to delete this location scheme? (You can't undo this)",
        ok: "Yes",
        cancel: "No",
        okCallback: () => this.deleteScheme()
      }
    });
  }

  deleteScheme() {
    let locationSchemeSectors = {
      locationScheme: this.locationScheme,
      sectors: this.sectors
    }

    this.locationSchemeService.deleteLocationScheme(locationSchemeSectors).subscribe(response => {
      this.snackbar.openFromComponent(SnackbarComponent, {
        data: "You have successfully deleted the location scheme",
        panelClass: ['snackbar-success']
      });
      this.router.navigate([SiteRoutes.LOCATION_SCHEMES]);
    }, errorResponse => {
      this.snackbar.openFromComponent(SnackbarComponent, {
        data: errorResponse.error,
        panelClass: ['snackbar-error']
      });
    });
  }

}
