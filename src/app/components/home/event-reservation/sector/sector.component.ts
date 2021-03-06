import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Sector } from 'src/app/shared/model/Sector';

@Component({
  selector: 'sector-component',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.scss']
})
export class SectorComponent implements OnInit {

  @Input() sectors: Array<Sector>;
  @Output() onSelect = new EventEmitter();

  constructor() { }

  calculateWidth(sector: Sector): any{
    var width = sector.bottomRightX - sector.topLeftX;
    return width;
  };

  calculateHeight(sector: Sector): any{
    var height = sector.bottomRightY - sector.topLeftY;
    return height;
  }

  open(sector: Sector): void{
    this.onSelect.emit(sector);
  }

  ngOnInit() {
  }

}
