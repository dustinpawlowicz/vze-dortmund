import { PipesModule } from './../../../pipes/pipes-module';
import { CustomOrderPositionModalPage } from './../../../modal/custom-order-position-modal/custom-order-position-modal.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CharacteristicsPage } from './characteristics.page';
import { TranslateModule } from '@ngx-translate/core';
import { StandardOrderPositionModalPage } from 'src/app/modal/standard-order-position-modal/standard-order-position-modal.page';
import { SignageOrderPositionModalPage } from 'src/app/modal/signage-order-position-modal/signage-order-position-modal.page';

const routes: Routes = [
  {
    path: '',
    component: CharacteristicsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    PipesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    CharacteristicsPage,
    StandardOrderPositionModalPage,
    SignageOrderPositionModalPage,
    CustomOrderPositionModalPage
  ],
  entryComponents: [
    StandardOrderPositionModalPage,
    SignageOrderPositionModalPage,
    CustomOrderPositionModalPage
  ]
})
export class CharacteristicsPageModule {}
