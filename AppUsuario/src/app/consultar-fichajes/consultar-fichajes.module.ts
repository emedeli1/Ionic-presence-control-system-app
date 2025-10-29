import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsultarFichajesPageRoutingModule } from './consultar-fichajes-routing.module';

import { ConsultarFichajesPage } from './consultar-fichajes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsultarFichajesPageRoutingModule
  ],
  declarations: [ConsultarFichajesPage]
})
export class ConsultarFichajesPageModule {}
