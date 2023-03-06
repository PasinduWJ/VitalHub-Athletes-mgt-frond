import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRoutingModule } from './page-routing.module';
import { PageComponent } from './page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';


@NgModule({
  declarations: [
    PageComponent,
    LandingPageComponent,
  ],
  imports: [
    CommonModule,
    PageRoutingModule
  ]
})
export class PageModule { }
