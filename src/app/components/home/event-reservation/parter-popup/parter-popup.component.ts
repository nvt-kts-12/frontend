import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface PopupData {
  id: string;
  freePlaces: number;
  sectorType: string;
  price: number;
  vip: boolean;
}

@Component({
  selector: 'parter-popup',
  templateUrl: './parter-popup.component.html',
  styleUrls: ['./parter-popup.component.scss']
})
export class ParterPopupComponent implements OnInit {

  ngOnInit(): void {
  }

  constructor(
    public dialogRef: MatDialogRef<ParterPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PopupData
  ) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
