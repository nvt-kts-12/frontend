import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { PopupData } from '../parter-popup/parter-popup.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Seat } from 'src/app/shared/model/Seat';

@Component({
  selector: 'grandstand-popup',
  templateUrl: './grandstand-popup.component.html',
  styleUrls: ['./grandstand-popup.component.scss']
})
export class GrandstandPopupComponent implements OnInit {

  @Output() onSelect = new EventEmitter();
  // chosenSeat: any;
  chosenSeats: Array<Seat> = new Array<Seat>();
  constructor(
    public grandstandDialog: MatDialogRef<GrandstandPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PopupData
  ) { }

  onCancelClick(): void {
    this.grandstandDialog.close();
  }
  

  seatPicked(seat: any): void {
    this.chosenSeats.push(seat);
  }

  ngOnInit() {
  }

}
