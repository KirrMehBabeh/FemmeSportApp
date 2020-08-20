import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RugbyleaguePage } from './rugbyleague.page';

const routes: Routes = [
  {
    path: '',
    component: RugbyleaguePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RugbyleaguePageRoutingModule {}
