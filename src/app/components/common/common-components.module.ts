import { NgModule } from '@angular/core';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { CoreModulesModule } from 'src/app/shared/components/core.module';
import { SectorDataDialogComponent } from '../admin/create-location-scheme/create-location-sectors/create-location-sectors.component';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    SectorDataDialogComponent
  ],
  imports: [
    CoreModulesModule
  ],
  entryComponents: [
    ConfirmDialogComponent,
    SectorDataDialogComponent
  ],
  exports: [
    ConfirmDialogComponent,
    SectorDataDialogComponent
  ],
})
export class CommonComponentsModule { }
