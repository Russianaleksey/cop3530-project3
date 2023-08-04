import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { MapComponent } from './map/map.component';
import { ResultsComponent } from './results/results.component';
import { ListrowComponent } from './listrow/listrow.component';
import { ListComponent } from './list/list.component';
@NgModule({
  declarations: [
    AppComponent,
    PreferencesComponent,
    MapComponent,
    ResultsComponent,
    ListComponent,
    ListrowComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
