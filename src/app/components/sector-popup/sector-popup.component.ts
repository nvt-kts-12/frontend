import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { PopupData } from '../popup-dialog/popup-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'sector-popup',
  templateUrl: './sector-popup.component.html',
  styleUrls: ['./sector-popup.component.scss']
})
export class SectorPopupComponent implements OnInit {

  @Output() onSelect = new EventEmitter();
  chosenSeat: any;
  displayedColumns: string[] = ['row'];

  constructor(
    public sectorDialog: MatDialogRef<SectorPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PopupData
  ) { }

  onCancelClick(): void {
    this.sectorDialog.close();
  }

  seatPicked(seat: any): void {
    this.chosenSeat = seat;
  }

  checkDisabled(seat: any): boolean {
    if (seat.sold) {
      return true;
    }
    return false;
  }

  ngOnInit() {
  }

}
