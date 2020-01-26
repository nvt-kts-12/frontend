import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { CreateEventQuery } from '../../../../shared/store/create-event/create-event.query'; 
import { LocationSchemeService } from '../../../../shared/services/location-scheme/location-scheme.service';
import { CreateEventDayComponent } from '../create-event-day/create-event-day.component';
import { EventService } from 'src/app/shared/services/event/event.service';
import { Router } from '@angular/router';
import { SiteRoutes } from 'src/app/shared/constants/site-routes';
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from 'src/app/components/common/snackbar/snackbar.component';

@Component({
  selector: 'app-create-event-days',
  templateUrl: './create-event-days.component.html',
  styleUrls: ['./create-event-days.component.scss']
})
export class CreateEventDaysComponent implements OnInit {

  @ViewChildren(CreateEventDayComponent) 
  eventDayComponents: QueryList<CreateEventDayComponent>;

  subscriptionToStore:any;

  createEvent:any = null;
  locations: any[];

  eventDaysDataSet = [];

  constructor(
    private createEventQuery: CreateEventQuery,
    private locationSchemeService: LocationSchemeService,
    private eventService: EventService,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  
  ngOnInit() {
    this.subscriptionToStore = this.createEventQuery.event$.subscribe(event => {
      this.createEvent = event;
    });

    this.locationSchemeService.getLocationSchemes().subscribe(response => {
      this.locations = response
    });
  }

  ngOnDestroy() {
    this.subscriptionToStore.unsubscribe();
  }

  sendCreateRequest() {

    if (this.validOnFrontend()) {

      this.getDatafromEveryEventDay();

      this.eventService.createEvent({
        event: {
          name: this.createEvent.name,
          description: this.createEvent.description,
          category: this.createEvent.category
        },
        eventDays: this.eventDaysDataSet
      }).subscribe(response => {
        this.snackbar.openFromComponent(SnackbarComponent, {
          data: "you have successfully created the event!",
          panelClass: ['snackbar-success']
        });
        this.router.navigate([SiteRoutes.CREATE_EVENT]);
      }, errorResponse => {
        this.showErrorFromBackend(errorResponse);
        this.eventDaysDataSet = [];
      });

      this.eventDaysDataSet = [];
    }
  }

  validOnFrontend() {
    let valid = true;

    if (!this.checkIfAllPricesFilledOut()) {
      this.showSnackbarError("Please fill out all the prices of sectors");
      valid = false;
    } else if (!this.datesValid()) {
      this.showSnackbarError("Not all reservation expiration dates are valid!");
      valid = false;
    } else if (!this.locationsPicked()) {
      this.showSnackbarError("Please pick a location for every event day.");
      valid = false;
    } else if (!this.atLeastOneSectorPicked()) {
      this.showSnackbarError("Please pick at least one sector for every event day.");
      valid = false;
    } else if (!this.checkIfAllCapacitiesFilledOut()) {
      this.showSnackbarError("Please fill out all the capacities of sectors");
      valid = false;
    }

    return valid;
  }

  showErrorFromBackend(errorResponse) {

    if(errorResponse.error.message != null) {
      if (errorResponse.error.message.startsWith("JSON parse error: Cannot deserialize value of type `double` from String")) {
        this.showSnackbarError("You have entered an invalid price.");
      } else if (errorResponse.error.message.startsWith("JSON parse error: Cannot deserialize value of type `int` from String")) {
        this.showSnackbarError("You have entered an invalid capacity.");
      } else if (errorResponse.error.errors[0].codes[6] == "Positive.capacity") {
        this.showSnackbarError("Capacity can't be negative.");
      } else if (errorResponse.error.errors[0].codes[6] == "PositiveOrZero.price") {
        this.showSnackbarError("Capacity can't be negative.");
      } else {
        this.showSnackbarError("Something went wrong.");
      }
    }
    else {
      this.showSnackbarError(errorResponse.error);
    }
  }
  
  getDatafromEveryEventDay() {
    this.eventDayComponents.forEach(childComponent => {
      this.eventDaysDataSet.push(childComponent.returnEventDayData());
    });
  }

  goBackToCreateEvent() {

    this.eventDaysDataSet = [];

    this.router.navigate([SiteRoutes.CREATE_EVENT]);
  }

  checkIfAllPricesFilledOut() {

    let result = true;

    this.eventDayComponents.forEach(eventDayForPrice => {
      if (!eventDayForPrice.allPricesFilledOut()) {
        result = false
      }
    });

    return result;
  }

  checkIfAllCapacitiesFilledOut() {

    let result = true;

    this.eventDayComponents.forEach(eventDayForCapacity => {
      if (!eventDayForCapacity.allCapacitiesFilledOut()) {
        result = false
      }
    });

    return result;
  }

  locationsPicked() {

    let result = true;

    this.eventDayComponents.forEach(eventDayForLocation => {
      if (!eventDayForLocation.locationPicked()) {
        result = false
      }
    });

    return result;
  }

  datesValid() {

    let result = true;

    this.eventDayComponents.forEach(eventDayForDate => {
      if (eventDayForDate.expirationDate == undefined){
        result = false
      }
    });

    return result; 
  }

  atLeastOneSectorPicked() {

    let result = true;

    this.eventDayComponents.forEach(eventDayForSectorsPicked => {
      if (eventDayForSectorsPicked.noSectorsPicked()){
        result = false
      }
    });

    return result; 

  }

  showSnackbarError(message) {
    this.snackbar.openFromComponent(SnackbarComponent, {
      data: message,
      panelClass: ['snackbar-error']
    });
  }
}
