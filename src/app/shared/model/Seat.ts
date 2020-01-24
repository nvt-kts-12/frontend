import { EventDay } from "./EventDay";

export type Seat = {
    id: number
    sectorId: number
    seatRow: number
    seatCol: number
    vip: false
    price: number
    sold: false
    event: Event
    eventDay: EventDay
    eventDayState: EventDayState
    user: null
}