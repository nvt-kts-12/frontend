import { ParterDto } from "./ParterDto";
import { SeatDto } from "./SeatDto";

export type EventDayReservationDTO = {
    eventDayId: number,
    parters: Array<ParterDto>,
    seats: Array<SeatDto>,
    purchase: boolean
}