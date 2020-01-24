import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketComponent implements OnInit {

  @Input() tickets;
  @Input() title: string;

  columnsReservations: string[] = ['id', 'event', 'date', 'location', 'category', 'type', 'sector', 'seatRow', 'seatCol', 'vip', 'price', 'expires', 'action' ];
  columnsBoughtTickets: string[] = ['id', 'event', 'date', 'location', 'category', 'type', 'sector', 'seatRow', 'seatCol', 'vip', 'price' ];


  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  getColumns() {
    if (this.title === "Reservations") {
      return this.columnsReservations;
    }

    return this.columnsBoughtTickets;
  }

}
