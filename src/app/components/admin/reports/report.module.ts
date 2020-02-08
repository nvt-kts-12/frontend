import { NgModule } from '@angular/core';
import { ReportsComponent } from './reports.component';
import { CoreModulesModule } from 'src/app/shared/components/core.module';


@NgModule({
  declarations: [
    ReportsComponent,
  ],
  imports: [
    CoreModulesModule,
  ],
})
export class ReportModule { }
