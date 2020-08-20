import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RugbyleaguePageRoutingModule } from './rugbyleague-routing.module';

import { RugbyleaguePage } from './rugbyleague.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RugbyleaguePageRoutingModule
  ],
  declarations: [RugbyleaguePage]
})
export class RugbyleaguePageModule {}
