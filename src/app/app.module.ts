import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {NavService} from "./core/services/nav/nav.service";
import {SessionsService} from "./core/services/sessions/sessions.service";
import {AuthService} from "./core/services/auth/auth.service";
import {UsersService} from "./core/services/users/users.service";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    AuthService,
    SessionsService,
    NavService,
    UsersService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
