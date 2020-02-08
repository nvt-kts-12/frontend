import { NgModule } from '@angular/core';
import { SnackbarComponent } from '../../components/common/snackbar/snackbar.component';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';
import { AdminModule } from '../../components/admin/admin.module';
import { HomeModule } from '../../components/home/home.module';
import { AccountModule } from '../../components/account/account.module';
import { UserModule } from '../../components/user/user.module';

@NgModule({
  declarations: [SnackbarComponent],
  entryComponents: [SnackbarComponent],
  imports: [
    AdminModule,
    HomeModule,
    AccountModule,
    UserModule
  ],
  exports: [],
  providers: [    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 5000, horizontalPosition: "right", verticalPosition: "bottom"},}
]
})
export class MainModule { }
