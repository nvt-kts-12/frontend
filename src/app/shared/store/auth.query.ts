import { QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { AuthStore, AuthState } from './auth.store';
import { User } from './user.model';

@Injectable()
export class AuthQuery extends QueryEntity<AuthState, User> {
  constructor(protected store: AuthStore) {
    super(store);
  }

  user$ = this.select(state => state.user);
  token$ = this.select(state => state.token);
  isLoggedIn$ = this.select(state => !!state.token);
  isAdmin$ = this.select(state => state.user ? state.user.authority === "ROLE_ADMIN" : null);
  role$ = this.select(state => state.user ? state.user.authority : null);
}
