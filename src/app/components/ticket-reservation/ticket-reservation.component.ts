import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/shared/services/event/event.service';
import { MatDialog } from '@angular/material';
import { ParterPopupComponent } from '../parter-popup/parter-popup.component';
import { EventDay } from '../../shared/model/EventDay';
import { Sector } from '../../shared/model/Sector';
import { EventDayReservationDto } from '../../shared/model/EventDayReservationDto';
import { SectorComponent } from '../sector/sector.component';
import { Parter } from 'src/app/shared/model/Parter';
import { GrandstandPopupComponent } from '../grandstand-popup/grandstand-popup.component';
import { TicketService } from 'src/app/shared/services/ticket/ticket.service';
import { Seat } from 'src/app/shared/model/Seat';
import { AuthService, AuthQuery } from 'src/app/shared/store';
import { ParterDto } from 'src/app/shared/model/ParterDto';
import { SeatDto } from 'src/app/shared/model/SeatDto';

/**
 * Main component for ticket purchase. Contains location layout, 
 * picked seats review and buttons for reserving an buying tickets.
 */
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
  displayedColumnsParter: string[] = ['sectorId', 'numberOfTickets', 'remove'];
  displayedColumnsSeats: string[] = ['sectorId', 'row/col', 'vip', 'remove'];
  numberOfTickets: number;


  parterTickets: [];
  grandstandTickets: [];
  parterPrice: number;

  parters: any;
  seats: any;
  totalPrice: number;
  user: any;


  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private ticektService: TicketService,
    private router: Router,
    public parterDialog: MatDialog,
    public grandstandDialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
    private authQuery: AuthQuery,
    private auth: AuthService,
  ) {
    this.eventId = route.snapshot.params['eventId'];
    this.eventDayId = route.snapshot.params['dayId'];

    this.authQuery.user$.subscribe((user) => {
      this.user = user;
    });

  }


  ngOnInit() {
    this.numberOfTickets = 0;
    this.totalPrice = 0;
    this.sectors = new Array<Sector>();
    this.parters = new Array<Parter>();
    this.seats = new Array<Seat>();
    this.fetchData();
  }

  /**
   * Deletes seat from table of picked seats
   * @param seat 
   */
  removeSeat(seat: any): void {
    const index: number = this.seats.indexOf(seat);
    console.log(index);
    if (index !== -1) {
      this.seats.splice(index, 1);
      let cloned = this.seats.slice();
      this.seats = cloned;
      this.totalPrice -= seat.price;
    }
  }

  /**
   * Deletes tickets for certain parter from parter tickets table
   * @param parter 
   */
  removeParter(parter: any): void {
    let index: number;
    this.parters.forEach((par) => {
      if (par.id === parter.id) {
        index = this.parters.indexOf(par);
      }
    })
    this.eventDay.sectors.forEach(eventDaySector => {
      if(eventDaySector.id === parter.sectorId){
        eventDaySector.numOfAvailablePlaces += parter.numberOfTickets;
      }
    })
    this.parters.splice(index, 1)
    this.recalculateTotalPrice();
  }

  /**
   * Recalculates total price of all tickets after removing some seats
   */
  recalculateTotalPrice(): void {
    this.totalPrice = 0;
    this.seats.forEach((seat) => {
      this.totalPrice += seat.price;
    })
    this.parters.forEach((parter) => {
      this.totalPrice += parter.price;
    })
  }

  /**
   * Opens dialog for entering number of tickets in case of parter, or for picking seat in case of grandstand
   * @param sector 
   */
  openPopup(sector: any): void {
    if (sector.type === "PARTER") {
      const dialogRef = this.parterDialog.open(ParterPopupComponent, {
        data: sector
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result != undefined) {
          this.updateParter(sector, result);
        }
      });

    } else if (sector.type === "GRANDSTAND") {

      this.ticektService.getAllTickets(sector.id, Number(this.eventDayId)).subscribe((res) => {
        console.log(res);
        res = this.updateTickest(res);
        const dialogRef = this.grandstandDialog.open(GrandstandPopupComponent, {
          data: {
            sector: sector,
            tickets: res
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result != undefined) {
            result.forEach(seat => {
              seat.user = this.user;
              this.seats.push(seat);
              this.totalPrice += seat.price;
            });
            let cloned = this.seats.slice();
            this.seats = cloned;
          }
        })
      });
    }

  }

  /**
   * Makes changes in tickets list based on currently picked seats
   * @param res 
   */
  updateTickest(res: any): any {
    res.forEach(ticket => {
      this.seats.forEach(seat => {
        if (seat.id === ticket.id) {
          ticket.user = this.user;
        }
      });
    });
    return res;
  }

  updateParter(sector: any, result: any) {
    let parter: Parter;
    let exists = false;
    this.totalPrice += result * sector.price;

    this.eventDay.sectors.forEach(eventDaySector => {
      if(eventDaySector.id === sector.id){
        eventDaySector.numOfAvailablePlaces -= result;
      }
    })

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

    this.sectors.forEach(singleSector => {
      if (singleSector.id === sector.id) {
        singleSector.numOfAvailablePlaces -= result;
      }
    });

    let clonedSec = this.sectors.slice();
    this.sectors = clonedSec;
  }


  fetchData() {
    this.eventService.getEventDay(this.eventDayId).subscribe((res) => {
      this.eventDay = res;
      console.log(this.eventDay);
    },
      error => {
        this.router.navigate(['/']);
      });
  }


  purchase(buy: boolean): void {
    let pickedParters: Array<ParterDto> = new Array<ParterDto>();
    let pickedSeats: Array<SeatDto> = new Array<SeatDto>();

    this.parters.forEach(parter => {
      pickedParters.push({
        sectorId: parter.sectorId,
        numberOfTickets: parter.numberOfTickets
      });
    });
    this.seats.forEach(seat => {
      pickedSeats.push({
        sectorId: seat.sectorId,
        row: seat.seatRow,
        col: seat.seatCol
      });
    })

    let reservationDto: EventDayReservationDto = {
      eventDayId: Number(this.eventDayId),
      parters: pickedParters,
      seats: pickedSeats,
      purchase: buy
    }
    this.eventService.reserve(reservationDto).subscribe((res) => {
      console.log(res);
      alert("Successful!")
      this.router.navigate(['/']);
    },
    error => {
      alert("Unsuccessful");
    })
  }

  reserve(): void {
    if (confirm("Are you sure you want to reserve these tickets?")) {
      this.purchase(false);
    }
  }

  buy(): void {
    if (confirm("Are you sure you want to buy these tickets?")) {
      this.purchase(true);
    }
  }

}