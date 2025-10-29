import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConsultarFichajesPage } from './consultar-fichajes.page';

const routes: Routes = [
  {
    path: '',
    component: ConsultarFichajesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultarFichajesPageRoutingModule {}
