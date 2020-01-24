import { NgModule } from '@angular/core';
import { MatToolbarModule, MatButtonModule, MatIconModule } from '@angular/material';
import { NavbarComponent } from './navbar.component';

@NgModule({
  imports: [
      MatToolbarModule,
      MatButtonModule,
      MatIconModule,
  ],
  exports: [
      MatToolbarModule,
      MatButtonModule,
      MatIconModule,
  ]
})
export class NavbarModule {}
