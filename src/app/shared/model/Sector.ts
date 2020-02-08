import {SectorType} from "./SectorType"

export type Sector = {
    id: number,
    deleted: boolean,

    topLeftX: number,
    topLeftY: number,
    bottomRightX: number,
    bottomRightY: number,

    capacity: number,
    rowNum: number,
    colNum: number,
    type: SectorType,

    vip: boolean,
    price: number,
    
    numOfAvailablePlaces: number
  }
  