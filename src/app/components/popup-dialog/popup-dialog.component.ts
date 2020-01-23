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
  selector: 'app-popup-dialog',
  templateUrl: './popup-dialog.component.html',
  styleUrls: ['./popup-dialog.component.scss']
})
export class PopupDialogComponent implements OnInit {

  ngOnInit(): void {
  }

  constructor(
    public dialogRef: MatDialogRef<PopupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PopupData
  ) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
