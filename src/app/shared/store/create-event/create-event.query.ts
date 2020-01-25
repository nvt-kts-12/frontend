import { QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { CreateEventStore, CreateEventState } from './create-event.store';
import { CreateEvent} from './create-event-model';

@Injectable()
export class CreateEventQuery extends QueryEntity<CreateEventState, CreateEvent> {
    constructor(protected store: CreateEventStore) {
        super(store);
    }

    event$ = this.select(state => state.event);
}