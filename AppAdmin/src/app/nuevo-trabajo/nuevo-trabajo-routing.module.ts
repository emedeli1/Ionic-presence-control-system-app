import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevoTrabajoPage } from './nuevo-trabajo.page';

const routes: Routes = [
  {
    path: '',
    component: NuevoTrabajoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevoTrabajoPageRoutingModule {}
