import { Sector } from "./Sector";
import {EventDayState} from "./EventDayState"

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