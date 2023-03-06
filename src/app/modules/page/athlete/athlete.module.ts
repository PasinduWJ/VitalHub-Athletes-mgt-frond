import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AthleteRoutingModule } from './athlete-routing.module';
import { AthleteComponent } from './athlete.component';
import { AthleteHeaderComponent } from './components/athlete-header/athlete-header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AthleteCreateComponent } from './components/athlete-create/athlete-create.component';


@NgModule({
  declarations: [
    AthleteComponent,
    AthleteHeaderComponent,
    DashboardComponent,
    AthleteCreateComponent
  ],
  imports: [
    CommonModule,
    AthleteRoutingModule
  ]
})
export class AthleteModule { }
