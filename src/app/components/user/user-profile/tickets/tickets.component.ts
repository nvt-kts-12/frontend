import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/shared/services/user/user.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmDialogComponent } from '../../../common/confirm-dialog/confirm-dialog.component';
import { TicketService } from 'src/app/shared/services/ticket/ticket.service';
import { SnackbarComponent } from '../../../common/snackbar/snackbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketComponent implements OnInit {

  @Input() tickets;
  @Input() title: string;
  @Output() refreshTable = new EventEmitter<void>();

  columnsReservations: string[] = ['id', 'event', 'date', 'location', 'category', 'type', 'sector', 'seatRow', 'seatCol', 'vip', 'price', 'expires', 'action'];
  columnsBoughtTickets: string[] = ['id', 'event', 'date', 'location', 'category', 'type', 'sector', 'seatRow', 'seatCol', 'vip', 'price'];


  constructor(private ticketService: TicketService,
    public cancelReservationDialog: MatDialog,
    private snackbar: MatSnackBar,
    private router: Router) { }

  loadingNeeded: boolean = false;

  ngOnInit() {
  }

  getColumns() {
    if (this.title === "Reservations") {
      return this.columnsReservations;
    }

    return this.columnsBoughtTickets;
  }

  onConfirmReservation(ticketId) {
    const dialogRef = this.cancelReservationDialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {
        title: "Confirm reservation?",
        message: "Are you sure?",
        ok: "Yes",
        cancel: "No",
        okCallback: () => this.confirmReservation(ticketId)
      }
    });
  }

  confirmReservation(ticketId) {
    this.loadingNeeded = true;
    this.ticketService.confirmReservation(ticketId).subscribe((res) => {
      window.location.replace(res.redirect_url);
    }),
      error => {
        this.loadingNeeded = false;
        this.snackbar.openFromComponent(SnackbarComponent, {
          data: "Reservation failed!",
          panelClass: ['snackbar-error'],
        });
        this.refreshTable.emit();
      }
  }


  onCancelReservationButton(ticketId) {
    const dialogRef = this.cancelReservationDialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {
        title: "Cancel reservation",
        message: "Are you sure?",
        ok: "Yes",
        cancel: "No",
        okCallback: () => this.cancelReservation(ticketId)
      }
    });
  }

  cancelReservation(ticketId) {
    this.ticketService.cancelReservation(ticketId).subscribe((res) => {
      this.snackbar.openFromComponent(SnackbarComponent, {
        data: "Reservation successfully canceled!",
        panelClass: ['snackbar-success'],
      });

      // fetch again
      this.refreshTable.emit();
    })
  }

}
