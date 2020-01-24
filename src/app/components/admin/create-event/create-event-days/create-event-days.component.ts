import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { CreateEventQuery } from '../../../../shared/store/create-event/create-event.query'; 
import { LocationSchemeService } from '../../../../shared/services/location-scheme/location-scheme.service';
import { CreateEventDayComponent } from '../create-event-day/create-event-day.component';
import { EventService } from 'src/app/shared/services/event/event.service';
import { Router } from '@angular/router';
import { SiteRoutes } from 'src/app/shared/constants/site-routes';

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
    private router: Router
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

    if (!this.checkIfAllPricesFilledOut()) {
      //TODO u snack
      alert("Please fill out all the prices of sectors");
    } else if (!this.datesValid()) {
      //TODO u snack
      alert("Not all reservation expiration dates are valid!");
    } else if (!this.locationsPicked()) {
      //TODO u snack
      alert("Please pick a location for every event day.");
    } else if (!this.atLeastOneSectorPicked()) {
      //TODO u snack
      alert("Please pick at least one sector for every event day.");
    } else if (!this.checkIfAllCapacitiesFilledOut()) {
       //TODO u snack
       alert("Please fill out all the capacities of sectors");
    }
    else {

      this.getDatafromEveryEventDay();

      this.eventService.createEvent({
        event: {
          name: this.createEvent.name,
          description: this.createEvent.description,
          category: this.createEvent.category
        },
        eventDays: this.eventDaysDataSet
      }).subscribe(response => {
        //TODO ovo u snackbar
        alert("you have successfully created the event!")
        this.router.navigate([SiteRoutes.CREATE_EVENT]);
      }, errorResponse => {
        if (errorResponse.error.message.startsWith("JSON parse error: Cannot deserialize value of type `double` from String")) {
          //TODO u snack
          alert("You have entered an invalid price.");
        } else if (errorResponse.error.message.startsWith("JSON parse error: Cannot deserialize value of type `int` from String")) {
          //TODO u snack
          alert("You have entered an invalid capacity.");
        } 
        else {
          alert("Something went wrong.");
        }
        this.eventDaysDataSet = [];
      });

      this.eventDaysDataSet = [];
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
}
