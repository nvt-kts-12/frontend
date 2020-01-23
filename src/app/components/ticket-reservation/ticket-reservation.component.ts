import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/shared/services/event/event.service';
import { MatDialog } from '@angular/material';
import { PopupDialogComponent } from '../popup-dialog/popup-dialog.component';
import { EventDay } from '../../shared/model/EventDay';
import { Sector } from '../../shared/model/Sector';
import { EventDayReservationDTO } from '../../shared/model/EventDayReservationDto';
import { SectorComponent } from '../sector/sector.component';
import { ParterDto } from 'src/app/shared/model/ParterDto';
import { SectorPopupComponent } from '../sector-popup/sector-popup.component';
import { TicketService } from 'src/app/shared/services/ticket/ticket.service';
import { SeatDto } from 'src/app/shared/model/SeatDto';

@Component({
  selector: 'app-ticket-reservation',
  templateUrl: './ticket-reservation.component.html',
  styleUrls: ['./ticket-reservation.component.scss']
})
export class TicketReservationComponent implements OnInit {


  eventId: string;
  eventDayId: string;
  eventDay: EventDay;
  sectors: any;
  displayedColumns: string[] = ['sectorId', 'numberOfTickets', 'price'];
  displayedColumnsSeats: string[] = ['sectorId', 'row/col', 'vip', 'price'];
  numberOfTickets: number;


  parterTickets: [];
  grandstandTickets: [];
  parterPrice: number;

  parters: any;
  seats: any;
  totalPrice: number;


  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private ticektService: TicketService,
    private router: Router,
    public parterDialog: MatDialog,
    public grandstandDialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef
  ) {
    this.eventId = route.snapshot.params['eventId'];
    this.eventDayId = route.snapshot.params['dayId'];
  }


  ngOnInit() {
    this.numberOfTickets = 0;
    this.totalPrice = 0;
    this.sectors = new Array<Sector>();
    this.parters = new Array<ParterDto>();
    this.seats = new Array<SeatDto>();
    this.fetchData();
  }

  openPopup(sector: any): void {
    if (sector.type === "PARTER") {
      const dialogRef = this.parterDialog.open(PopupDialogComponent, {
        data: sector
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result != undefined) {
          this.updateParter(sector, result);
        }
      });

    } else if (sector.type === "GRANDSTAND") {

      this.ticektService.getAllTickets(sector.id, Number(this.eventDayId)).subscribe((res) => {
        console.log(sector);
        const dialogRef = this.grandstandDialog.open(SectorPopupComponent, {
          data: {
            sector: sector,
            tickets: res
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result != undefined) {
            this.seats.push(result);
            this.totalPrice += result.price;
            
            let cloned = this.seats.slice();
            this.seats = cloned;
          }
        })
      });
    }

  }
  updateParter(sector: any, result: any) {
    let parter: ParterDto;
    let exists = false;
    this.totalPrice += result * sector.price;

    this.parters.forEach((par) => {
      if (par.sectorId === sector.id) {
        par.numberOfTickets = par.numberOfTickets + result;
        par.price = result * sector.price;
        exists = true;
      }
    });

    if (!exists) {
      parter = {
        sectorId: sector.id,
        numberOfTickets: result,
        price: result * sector.price
      }
      this.parters.push(parter);
    }

    let cloned = this.parters.slice();
    this.parters = cloned;
  }


  fetchData() {
    this.eventService.getEventDay(this.eventDayId).subscribe((res) => {
      this.eventDay = res;
      console.log(this.eventDay);

      /*Hard code **********************************************************/
      /* */
      /*********************************************************************/
      // this.eventDay.sectors[0].topLeftX = 25;
      // this.eventDay.sectors[0].topLeftY = 10;
      // this.eventDay.sectors[0].bottomRightX = 65;
      // this.eventDay.sectors[0].bottomRightY = -100;

      // this.eventDay.sectors[1].topLeftX = 235;
      // this.eventDay.sectors[1].topLeftY = 10;
      // this.eventDay.sectors[1].bottomRightX = 275;
      // this.eventDay.sectors[1].bottomRightY = -100;

      // this.eventDay.sectors[2].topLeftX = 85;
      // this.eventDay.sectors[2].topLeftY = 10;
      // this.eventDay.sectors[2].bottomRightX = 215;
      // this.eventDay.sectors[2].bottomRightY = -20;
      /*********************************************************************/
      /* */
      /*Hard code ************************************************************/


      this.eventDay.sectors.forEach(sector => {
        this.sectors.push(sector);
      })
      // console.log(this.sectors);
      // todo: get places left by sector
    },
      error => {
        this.router.navigate(['/']);
      });
  }
}


