import { NgModule } from '@angular/core';
import { CreateLocationSchemeComponent } from './create-location-scheme/create-location-scheme.component';
import { LocationSchemeInfoComponent } from './create-location-scheme/location-scheme-info/location-scheme-info.component';
import { CreateLocationSectorsComponent } from './create-location-scheme/create-location-sectors/create-location-sectors.component';
import { DrawSectorsComponent } from './create-location-scheme/create-location-sectors/draw-sectors/draw-sectors.component';
import { LocationSchemesListComponent } from './location-schemes-list/location-schemes-list.component';
import { EditLocationSchemeComponent } from './edit-location-scheme/edit-location-scheme.component';
import { CoreModulesModule } from 'src/app/shared/components/core.module';


@NgModule({
  declarations: [
    CreateLocationSchemeComponent,
    LocationSchemeInfoComponent,
    CreateLocationSectorsComponent,
    DrawSectorsComponent,
    LocationSchemesListComponent,
    EditLocationSchemeComponent
  ],
  imports: [
    CoreModulesModule
  ],
})
export class LocationModule { }
