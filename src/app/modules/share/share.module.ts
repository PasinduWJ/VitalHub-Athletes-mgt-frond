import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {HttpClientModule} from "@angular/common/http";
import {LoadingPageComponent} from './component/loading-page/loading-page.component';


@NgModule({
  declarations: [
    LoadingPageComponent
  ],
  exports: [
    LoadingPageComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    HttpClientModule,
  ]
})
export class ShareModule {
}
