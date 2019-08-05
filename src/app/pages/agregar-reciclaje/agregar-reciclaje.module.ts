import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AgregarReciclajePage } from './agregar-reciclaje.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarReciclajePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AgregarReciclajePage]
})
export class AgregarReciclajePageModule {}
