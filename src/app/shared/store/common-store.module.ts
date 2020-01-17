import { NgModule } from '@angular/core';
import { persistState } from '@datorama/akita';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';

import { AuthStore } from './auth.store';
import { AuthService } from './auth.service';
import { AuthQuery } from './auth.query';

/*
* all stores stated in include
* will be persisted in localStorage
*/
persistState({
  include: [
    'auth'
  ]
});


@NgModule({
  exports: [],
  providers: [
    AuthStore,
    AuthService,
    AuthQuery
  ]
})
export class CommonStoreModule {}
