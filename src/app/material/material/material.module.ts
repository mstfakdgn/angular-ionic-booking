import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MaterialPage } from './material.page';
import { MaterialModule } from '../../material.module';

const routes: Routes = [
  {
    path: '',
    component: MaterialPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    MaterialModule
  ],
  declarations: [MaterialPage]
})
export class MaterialPageModule {}
