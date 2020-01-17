import { StoreConfig, EntityState, EntityStore } from '@datorama/akita';
import { User } from './user.model';

export interface AuthState extends EntityState<User> {
    user: Partial<User>,
    token: string
}

export function createInitialState(): AuthState {
    return {
        user: null,
        token: null
    }
}

@StoreConfig({ name: 'auth' })
export class AuthStore extends EntityStore<AuthState, User> {
    constructor() {
        super(createInitialState());
    }
}
