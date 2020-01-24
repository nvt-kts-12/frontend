import { ParterDto } from "./ParterDto";
import { SeatDto } from "./SeatDto";

export type EventDayReservationDto = {
    eventDayId: number;
    parters: Array<ParterDto>;
    seats: Array<SeatDto>;
    purchase: boolean;

}