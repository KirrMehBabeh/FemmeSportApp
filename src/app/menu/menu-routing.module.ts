import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/menu/home',
    pathMatch: 'full' 
  },
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'home', loadChildren: '../home/home.module#HomePageModule'
      },
      {
        path: 'soccer',
        loadChildren: '../categories/soccer/soccer.module#SoccerPageModule'
      },
      {
        path: 'rugbyleague',
        loadChildren: '../categories/rugbyleague/rugbyleague.module#RugbyleaguePageModule'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
