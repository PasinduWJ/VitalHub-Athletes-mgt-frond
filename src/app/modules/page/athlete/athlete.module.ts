import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AthleteRoutingModule } from './athlete-routing.module';
import { AthleteComponent } from './athlete.component';
import { AthleteHeaderComponent } from './components/athlete-header/athlete-header.component';
import { DashboardComponent } from './components/dashboard-view/dashboard/dashboard.component';
import { AthleteCreateComponent } from './components/athlete-create/athlete-create.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from '@angular/material/select';
import { AthleteDetailsComponent } from './components/dashboard-view/athlete-details/athlete-details.component';
@NgModule({
  declarations: [
    AthleteComponent,
    AthleteHeaderComponent,
    DashboardComponent,
    AthleteCreateComponent,
    AthleteDetailsComponent,
  ],
  imports: [
    CommonModule,
    AthleteRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ]
})
export class AthleteModule { }
