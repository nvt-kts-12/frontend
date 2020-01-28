import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { DrawSectorsComponent } from './draw-sectors/draw-sectors.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/components/common/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from 'src/app/components/common/snackbar/snackbar.component';


@Component({
  selector: 'app-create-location-sectors',
  templateUrl: './create-location-sectors.component.html',
  styleUrls: ['./create-location-sectors.component.scss']
})
export class CreateLocationSectorsComponent implements OnInit {

  @ViewChild(DrawSectorsComponent)
  drawSectors: DrawSectorsComponent;

  sectorsForDrawing: any[] = [];

  sectorsForRequest: any[] = [];

  activeOption = "GRANDSTAND";

  sectorData = {
    capacity: 0,
    rowNum: 0,
    colNum: 0
  }

  constructor(public dialog: MatDialog, private snackbar: MatSnackBar) {

  }

  ngOnInit() {

  }

  getNewSector(sector: any) {
    this.openDialog(sector);
    this.drawSectors.resetSector();
  }

  addSector(sector) {

    this.sectorsForDrawing.push(sector);

    this.sectorsForRequest.push({
      topLeftX: sector.topLeftX,
      topLeftY: sector.topLeftY,
      bottomRightX: sector.topLeftX + sector.width,
      bottomRightY: sector.topLeftY + sector.height,
      capacity: this.sectorData.capacity,
      rowNum: this.sectorData.rowNum,
      colNum: this.sectorData.colNum,
      type: sector.type
    });
  }

  returnSectors() {
    return this.sectorsForRequest;
  }

  setOption(option) {
    if (this.activeOption != option) {
      this.activeOption = option;
    }
  }

  removeSector(sector) {
    this.sectorsForDrawing = this.sectorsForDrawing.filter(sectorFromList => sector != sectorFromList);
    this.sectorsForRequest = this.sectorsForRequest.filter(sectorFromList => {
      return sector.topLeftX != sectorFromList.topLeftX && sector.topLeftY != sectorFromList.topLeftY; 
    });  
  }

  openDialog(sector): void {
    const dialogRef = this.dialog.open(SectorDataDialogComponent, {
      width: '250px',
      data: {
        ...this.sectorData, 
        activeOption: this.activeOption
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.sectorData = result;
        this.checkTypeOfSectorAndAdd(sector);
      }
      this.resetSectorData();
    })
  }

  checkTypeOfSectorAndAdd(sector) {
    if(this.activeOption == "PARTER") {
      if(this.sectorData.capacity > 0) {
        this.addSector(sector);
      } else {
        this.showSnackbarError("Parter capacity must be greater than 0.");
      }
    } else {
      if(this.grandstandValid(this.sectorData.capacity, this.sectorData.colNum, this.sectorData.rowNum)) {
        this.addSector(sector);
      }
    }
  }
  
  grandstandValid(capacity, rowNum, colNum) {
    if(capacity <= 0 || colNum <= 0 && rowNum <= 0) {
      this.showSnackbarError("Capacity, number of rows, and number of columns must be greater than 0.");
      return false;
    } else if (capacity != (colNum * rowNum)) {
      this.showSnackbarError("Capacity must be equal to number of rows multiplied by number of columns.");
      return false;
    }
    return true;
  }

  isGrandstand() {
    return this.activeOption == "GRANDSTAND";
  }
  
  showSnackbarError(message) {
    this.snackbar.openFromComponent(SnackbarComponent, {
      data: message,
      panelClass: ['snackbar-error']
    });
  }

  resetSectorData() {
    this.sectorData = {
      capacity: 0,
      rowNum: 0,
      colNum: 0
    }
  }
}

@Component({
  selector: 'sector-data-dialog',
  templateUrl: 'sector-data-dialog.html'
})
export class SectorDataDialogComponent {
  
  constructor(public dialogRef: MatDialogRef<SectorDataDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
