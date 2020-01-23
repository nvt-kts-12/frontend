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

  displayedColumns: string[] = ['id', 'event', 'date', 'location', 'category', 'type', 'sector', 'seatRow', 'seatCol', 'vip', 'price' ];

  constructor(private userService: UserService) { }

  ngOnInit() {
    
  }

}
