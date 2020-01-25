import { SectorType } from "./SectorType"

export type SectorDto = {
    sectorType: SectorType,
    sectorId: number,
    price: number,
    vip: boolean,
}