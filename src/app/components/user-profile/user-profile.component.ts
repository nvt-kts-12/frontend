import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthStore, User, AuthQuery } from 'src/app/shared/store';
import { UserService } from 'src/app/shared/services/user/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  
  user : Partial<User>
  test : any 
  reservations: []
  boughtTickets: []

  userSub: Subscription;
  getReservationsSub: Subscription;
  getTicketsSub: Subscription;

  constructor(public authQuery: AuthQuery, private userService: UserService) { }

  ngOnInit() {
    this.userSub = this.authQuery.user$.subscribe((user) => {
      this.user = user;
    })

    this.getReservationsSub = this.userService.getReservations().subscribe((res) => {
      this.reservations = res.tickets;
    })

    this.getTicketsSub = this.userService.getBoughtTickets().subscribe((res) => {
      this.boughtTickets = res.tickets;
    })
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.getReservationsSub.unsubscribe();
    this.getTicketsSub.unsubscribe();
  }


}
