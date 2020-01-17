import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material.module'
import { CommonStoreModule } from './../store'

@NgModule({
  imports: [
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    CommonStoreModule
  ],
  exports: [
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    CommonStoreModule
  ]
})
export class CoreModulesModule {}
