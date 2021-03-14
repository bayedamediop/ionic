import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FraisPageRoutingModule } from './frais-routing.module';

import { FraisPage } from './frais.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    FraisPageRoutingModule
  ],
  declarations: [FraisPage]
})
export class FraisPageModule {}
