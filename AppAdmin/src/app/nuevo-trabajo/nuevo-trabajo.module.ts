import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevoTrabajoPageRoutingModule } from './nuevo-trabajo-routing.module';

import { NuevoTrabajoPage } from './nuevo-trabajo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevoTrabajoPageRoutingModule
  ],
  declarations: [NuevoTrabajoPage]
})
export class NuevoTrabajoPageModule {}
