import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AthleteRoutingModule } from './athlete-routing.module';
import { AthleteComponent } from './athlete.component';
import { AthleteHeaderComponent } from './components/athlete-header/athlete-header.component';


@NgModule({
  declarations: [
    AthleteComponent,
    AthleteHeaderComponent
  ],
  imports: [
    CommonModule,
    AthleteRoutingModule
  ]
})
export class AthleteModule { }
