import { Component, OnInit } from '@angular/core';
import { AuthStore, User, AuthQuery } from 'src/app/shared/store';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user : Partial<User>
  test : any 
  reservations: []
  boughtTickets: []

  displayedColumns: string[] = ['type', 'price', 'vip'];

  constructor(public authQuery: AuthQuery, private userService: UserService) { }

  ngOnInit() {
    this.authQuery.user$.subscribe((user) => {
      this.user = user;
    })

    this.userService.getReservations().subscribe((res) => {
      this.reservations = res.tickets;
    })

    this.userService.getBoughtTickets().subscribe((res) => {
      this.boughtTickets = res.tickets;
    })
  }



}
