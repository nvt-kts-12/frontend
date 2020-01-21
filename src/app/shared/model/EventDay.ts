import { Sector } from "./Sector";

export type EventDay = {
    event: Event,
    date: string,
    reservationExpireDate: string,
    eventDayState: EventDayState,
    locationSchemeId: number,
    locationName: string,
    locationAdress: string,
    sectors: Array<Sector>
}