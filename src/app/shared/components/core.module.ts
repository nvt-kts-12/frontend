import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material.module'
import { CommonStoreModule } from './../store'
import { RouterModule } from '@angular/router';



@NgModule({
  imports: [
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    CommonStoreModule,
    RouterModule
  ],
  exports: [
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    CommonStoreModule,
    RouterModule
  ]
})
export class CoreModulesModule {}
