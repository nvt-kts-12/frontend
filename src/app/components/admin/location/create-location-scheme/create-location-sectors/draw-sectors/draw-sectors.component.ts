import { Component, OnInit, ElementRef, Input, EventEmitter, Output } from '@angular/core';
import { fromEvent } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';
import { DrawingDimensions } from 'src/app/shared/constants';
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from 'src/app/components/common/snackbar/snackbar.component';

@Component({
  selector: 'app-draw-sectors',
  templateUrl: './draw-sectors.component.html',
  styleUrls: ['./draw-sectors.component.scss']
})
export class DrawSectorsComponent implements OnInit {

  @Input()
  sectors: any[];

  @Input()
  activeOption: string;

  @Output()
  onDraw = new EventEmitter<Object>();

  @Output()
  onRemove = new EventEmitter<Object>();

  mouseup$
  mousedown$;
  mousemove$;
  mousehold$;
  mouseleave$;
  mouseX: number;
  mouseY: number;
  _sub: any;

  topLeftX: any;
  topLeftY: any;

  sector = {
    topLeftX: 0,
    topLeftY: 0,
    height: 0,
    width: 0,
    type: ''
  }

  svgWidth:number = 0;
  svgHeight: number = 0;
  
  constructor(
    private _el: ElementRef,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {

    this.svgWidth = DrawingDimensions.SVG_WIDTH;
    this.svgHeight = DrawingDimensions.SVG_HEIGHT;

    this.mousedown$ = fromEvent(this._el.nativeElement, 'mousedown');
    this.mousedown$.subscribe((e) => {
      if (e.which == 1 && e.offsetY < DrawingDimensions.SVG_HEIGHT && this.activeOption != "DELETE") {
        this.mouseX = e.offsetX;
        this.mouseY = e.offsetY;
        this.topLeftX = e.offsetX;
        this.topLeftY = e.offsetY;
      }
    })
    this.mousemove$ = fromEvent(this._el.nativeElement, 'mousemove');
    this.mouseup$ = fromEvent(this._el.nativeElement, 'mouseup');

    this.mouseleave$ = fromEvent(this._el.nativeElement, 'mouseleave');

    this.mouseup$.subscribe((e) => {
      if (e.which == 1 && this.activeOption != "DELETE") {
        if((this.sector.height < 20 || this.sector.width < 20) || this.sectorOverlap(this.sector)) {
          this.snackbar.openFromComponent(SnackbarComponent, {
            data: "Sector is too small or overlapping with another sector",
            panelClass: ['snackbar-error']
          });
          this.resetSector();
        } else {
          this.onDraw.emit(this.sector);
        }
      }
      this.unsub();
      this.register();
    });

    this.mouseleave$.subscribe((e) => {
      this.resetSector();
    });

    this.mousehold$ = this.mousedown$.pipe(switchMap(() => this.mousemove$)).pipe(takeUntil(this.mouseup$));

    this._sub = this.mousehold$.subscribe((e) => {
      if (e.which == 1 && e.offsetY < DrawingDimensions.SVG_HEIGHT && this.activeOption != "DELETE") {
        this.mouseX = e.offsetX;
        this.mouseY = e.offsetY;
        this.drawRectange(e.offsetX, e.offsetY);
      } else if (e.offsetY > DrawingDimensions.SVG_HEIGHT) {
        this.resetSector();
      }
    })
  }

  unsub() {
    if(this._sub) {
      this._sub.unsubscribe();
    }
  }
  
  register() {
    this.mousehold$ = this.mousedown$.pipe(switchMap(()=> this.mousemove$), takeUntil(this.mouseup$));

    this._sub = this.mousehold$.subscribe((e) => {
      if (e.which == 1 && e.offsetY < DrawingDimensions.SVG_HEIGHT && this.activeOption != "DELETE") {
        this.mouseX = e.offsetX;
        this.mouseY = e.offsetY;
        this.drawRectange(e.offsetX, e.offsetY);
      } else if (e.offsetY > DrawingDimensions.SVG_HEIGHT) {
        this.resetSector();
      }
    });
  }

  drawRectange(bottomRightX, bottomRightY) {

    if((bottomRightX - this.topLeftX) > 0 && (bottomRightY - this.topLeftY) > 0) {
      this.drawBottomRightQuadrant(bottomRightX, bottomRightY);
    } else if ((bottomRightX - this.topLeftX) < 0 && (bottomRightY - this.topLeftY) > 0) {
      this.drawBottomLeftQuadrant(bottomRightX, bottomRightY);
    } else if ((bottomRightX - this.topLeftX) < 0 && (bottomRightY - this.topLeftY) < 0) {
      this.drawTopLeftQuadrant(bottomRightX, bottomRightY);
    } else if ((bottomRightX - this.topLeftX) > 0 && (bottomRightY - this.topLeftY) < 0){
      this.drawTopRightQuadrant(bottomRightX, bottomRightY);
    }
  }

  drawBottomRightQuadrant(bottomRightX, bottomRightY) {
    this.sector = {
      topLeftX: this.topLeftX,
      topLeftY: this.topLeftY,
      width: bottomRightX - this.topLeftX,
      height: bottomRightY - this.topLeftY,
      type: this.activeOption
    };
  }

  drawBottomLeftQuadrant(bottomRightX, bottomRightY) {
    this.sector = {
      topLeftX: this.topLeftX - Math.abs(bottomRightX - this.topLeftX),
      topLeftY: this.topLeftY,
      width: Math.abs(bottomRightX - this.topLeftX),
      height: bottomRightY - this.topLeftY,
      type: this.activeOption
    };
  }

  drawTopLeftQuadrant(bottomRightX, bottomRightY) {
    this.sector = {
      topLeftX: this.topLeftX - Math.abs(bottomRightX - this.topLeftX),
      topLeftY: this.topLeftY - Math.abs(bottomRightY - this.topLeftY),
      width: Math.abs(bottomRightX - this.topLeftX),
      height: Math.abs(bottomRightY - this.topLeftY),
      type: this.activeOption
    };
  }

  drawTopRightQuadrant(bottomRightX, bottomRightY) {
    this.sector = {
      topLeftX: this.topLeftX,
      topLeftY: this.topLeftY - Math.abs(bottomRightY - this.topLeftY),
      width: bottomRightX - this.topLeftX,
      height: Math.abs(bottomRightY - this.topLeftY),
      type: this.activeOption
    };
  }

  resetSector() {
    this.sector = {
      topLeftX: 0,
      topLeftY: 0,
      height: 0,
      width: 0,
      type: ''
    }
  }

  removeSector(sector) {
    if (this.activeOption == "DELETE") {
      this.onRemove.emit(sector);
    }
  }

  sectorOverlap(sector) {

    let overlapping:boolean = false;

    this.sectors.forEach(sectorFromList => {
      if(this.checkOverlaps(sector, sectorFromList)) {
        overlapping = true;
      }
    });

    return overlapping;
  }

  checkOverlaps(sector1, sector2) {
    let xOverlap = this.overlapOnSingleAxis(sector1.topLeftX, sector1.topLeftX + sector1.width, sector2.topLeftX, sector2.topLeftX + sector2.width);
    let yOverlap = this.overlapOnSingleAxis(sector1.topLeftY, sector1.topLeftY + sector1.height, sector2.topLeftY, sector2.topLeftY + sector2.height);
    return xOverlap && yOverlap;
  }

  overlapOnSingleAxis(a1, a2, a3, a4) {
    let overlapOnSingleAxis:boolean = false;

    if (a1 >= a3 && a1 <= a4) {
      overlapOnSingleAxis = true;
    }

    if (a2 >= a3 && a2 <= a4) {
      overlapOnSingleAxis = true;
    }

    if (a1 <= a3 && a2 >= a4) {
      overlapOnSingleAxis = true;
    }

    return overlapOnSingleAxis;
  }
}
