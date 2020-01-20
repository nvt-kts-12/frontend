import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/shared/services/event/event.service';
import { MatDialog } from '@angular/material';
import { PopupDialogComponent } from '../popup-dialog/popup-dialog.component';


export interface Ticket {
  id: string;
  sectorType: string;
  price: number;
  vip: boolean;
}
const tickets: Ticket[] = [
  { id: "1", sectorType: 'GRANDSTAND', price: 1.0079, vip: false },
];

@Component({
  selector: 'app-ticket-reservation',
  templateUrl: './ticket-reservation.component.html',
  styleUrls: ['./ticket-reservation.component.scss']
})
export class TicketReservationComponent implements OnInit {


  eventId: string;
  eventDayId: string;
  eventDay: any;

  displayedColumns: string[] = ['id', 'sectorType', 'price', 'vip'];
  dataSource = tickets;


  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.eventId = route.snapshot.params['eventId'];
    this.eventDayId = route.snapshot.params['dayId'];
  }


  ngOnInit() {
    this.fetchData();
  }

  ticket: {
    id: string,
    sectorType: string,
    price: number,
    vip: boolean
  };

  numOfChoosenPlaces: 0;   

  openPopup(sector: any): void {
    console.log(sector)
    this.ticket = {
      id: sector.sectorId,
      sectorType: sector.sectorType,
      price: sector.price,
      vip: sector.vip
    }
    const dialogRef = this.dialog.open(PopupDialogComponent, {
      data: this.ticket
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      tickets.push(this.ticket);
      this.numOfChoosenPlaces = result;
      console.log('Taken places: ' + this.numOfChoosenPlaces);
      console.log(tickets);
      this.dataSource = tickets;
    });
  }

  fetchData() {
    this.eventService.getEventDays(this.eventId).subscribe((res) => {
      res.forEach(day => {
        if (day.id == parseInt(this.eventDayId)) {
          this.eventDay = day;
          console.log(this.eventDay);
        }
      });
      console.log("Top top topcina");
    },
      error => {
        this.router.navigate(['/']);
      })
  }
}


