import { NgModule } from '@angular/core';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { CoreModulesModule } from 'src/app/shared/components/core.module';

@NgModule({
  declarations: [
    ConfirmDialogComponent
  ],
  imports: [
    CoreModulesModule
  ],
  entryComponents: [
    ConfirmDialogComponent
  ],
  exports: [
    ConfirmDialogComponent
  ],
})
export class CommonComponentsModule { }
