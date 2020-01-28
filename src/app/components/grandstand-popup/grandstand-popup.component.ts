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
  
  totalPrice: number = 0;
  chosenSeats: Array<Seat> = new Array<Seat>();

  constructor(
    public grandstandDialog: MatDialogRef<GrandstandPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PopupData
  ) { }

  onCancelClick(): void {
    this.grandstandDialog.close();
  }

  checkDisabled(seat: Seat): any{
    let disabled = false;
    if(seat.user!=null){
      disabled = true;
    }else{
      this.chosenSeats.forEach(chosenSeat =>{
        if(chosenSeat.id === seat.id){
          disabled = true;
        }
      })
    }
    return disabled;
  }
  
  removeSeat(seat: Seat): void{
    this.totalPrice -= seat.price;
    this.chosenSeats.splice(this.chosenSeats.indexOf(seat), 1);
    let clone = this.chosenSeats.slice();
    this.chosenSeats = clone;
  }

  seatPicked(seat: any): void {
    this.chosenSeats.push(seat);
    this.totalPrice += seat.price;
  }

  ngOnInit() {
  }

}
