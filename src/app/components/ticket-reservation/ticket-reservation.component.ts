import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/shared/services/event/event.service';
import { MatDialog } from '@angular/material';
import { PopupDialogComponent } from '../popup-dialog/popup-dialog.component';
import { EventDay } from '../../shared/model/EventDay';
import { Sector } from '../../shared/model/Sector';


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
  eventDay: EventDay;
  sectors: Array<Sector>;

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

  drawSectors() {
    if (this.eventDay != undefined) {
      var canvas: any = document.getElementById("locationCanvas");
      var ctx = canvas.getContext("2d");
      this.eventDay.sectors.forEach(sector => {
        ctx.beginPath();
        var width = sector.bottomRightX - sector.topLeftX;
        var height = sector.topLeftY - sector.bottomRightY;
        ctx.rect(sector.topLeftX, sector.topLeftY, width, height);
        ctx.strokeStyle = "red";
        ctx.stroke();
      });
    }
  }

  ticket: {
    id: string,
    sectorType: string,
    price: number,
    vip: boolean
  };

  numOfChoosenPlaces: 0;

  open(): void{
    console.log("asdsad");
  }

  openPopup(sector: any): void {
    console.log(sector)

    const dialogRef = this.dialog.open(PopupDialogComponent, {
      data: sector
    });

    dialogRef.afterClosed().subscribe(result => {
      this.numOfChoosenPlaces = result;
      console.log('Taken places: ' + this.numOfChoosenPlaces);
    });
  }

  fetchData() {
    this.eventService.getEventDay(this.eventDayId).subscribe((res) => {
      this.eventDay = res;
      console.log(this.eventDay);

      /*Hard code **********************************************************/
      /* */
      /*********************************************************************/
      this.eventDay.sectors[0].topLeftX = 25;
      this.eventDay.sectors[0].topLeftY = 10;
      this.eventDay.sectors[0].bottomRightX = 65;
      this.eventDay.sectors[0].bottomRightY = -100;

      this.eventDay.sectors[1].topLeftX = 235;
      this.eventDay.sectors[1].topLeftY = 10;
      this.eventDay.sectors[1].bottomRightX = 275;
      this.eventDay.sectors[1].bottomRightY = -100;

      this.eventDay.sectors[2].topLeftX = 85;
      this.eventDay.sectors[2].topLeftY = 10;
      this.eventDay.sectors[2].bottomRightX = 215;
      this.eventDay.sectors[2].bottomRightY = -20;

      this.drawSectors();

      this.eventDay.sectors.forEach(sector => {
        var canvas: any = document.getElementById("locationCanvas");
        var ctx = canvas.getContext("2d");
        ctx.font = "8px Comic Sans MS";
        var width = sector.bottomRightX - sector.topLeftX;
        var height = sector.topLeftY - sector.bottomRightY;

        var x = sector.topLeftX + (width / 2);
        var y = sector.topLeftY + (height / 2);
        ctx.fillText(sector.type[0], x, y);
      })
      /*********************************************************************/
      /* */
      /*Hard code ************************************************************/

      // todo: get places left by sector
    },
      error => {
        this.router.navigate(['/']);
      });
  }
}


