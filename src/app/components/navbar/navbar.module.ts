import { NgModule } from '@angular/core';
import { MatToolbarModule, MatButtonModule, MatIconModule } from '@angular/material';

@NgModule({
  imports: [
      MatToolbarModule,
      MatButtonModule,
      MatIconModule
  ],
  exports: [
      MatToolbarModule,
      MatButtonModule,
      MatIconModule
  ]
})
export class NavbarModule {}
