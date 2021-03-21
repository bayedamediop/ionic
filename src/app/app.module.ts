import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule,  HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Interceptor } from 'src/__helper/Interceptor';
import {LodinGuard} from "./guard/LodinGuard";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {JwPaginationModule} from "jw-angular-pagination";
import {PipesModule} from "./pipes/pipes.module";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
     AppRoutingModule,
      HttpClientModule,
    PipesModule,
    JwPaginationModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true},
  LodinGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
