import { NgModule } from '@angular/core';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { CoreModulesModule } from 'src/app/shared/components/core.module';
import { SectorDataDialogComponent } from '../admin/location/create-location-scheme/create-location-sectors/create-location-sectors.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    SectorDataDialogComponent,
    SearchComponent
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
    SectorDataDialogComponent,
    SearchComponent
  ],
})
export class CommonComponentsModule { }
