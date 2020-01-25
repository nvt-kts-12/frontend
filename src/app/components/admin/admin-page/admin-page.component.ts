import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToCreateEvent() {
    this.router.navigate(['/create-event']);
  }

  goToCreateLocationScheme() {
    this.router.navigate(['/create-location-scheme']);
  }

}
