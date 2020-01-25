import { StoreConfig, EntityState, EntityStore } from '@datorama/akita';
import { CreateEvent } from './create-event-model';

export interface CreateEventState extends EntityState<CreateEvent> {
    event: Partial<CreateEvent>
}

export function init(): CreateEventState {
    return {
        event: null
    }
}

@StoreConfig({ name: 'create-event'})
export class CreateEventStore extends EntityStore<CreateEventState, CreateEvent> {
    constructor() {
        super(init());
    }
}