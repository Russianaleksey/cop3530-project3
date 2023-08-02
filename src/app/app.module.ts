import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { MapComponent } from './map/map.component';
@NgModule({
  declarations: [
    AppComponent,
    PreferencesComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent, PreferencesComponent, MapComponent]
})
export class AppModule { }
