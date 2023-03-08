import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from "@angular/forms";
import {ShareModule} from "./modules/share/share.module";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {InterseptorInterceptor} from "./modules/share/interceptor/interseptor.interceptor";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ShareModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: InterseptorInterceptor, multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
