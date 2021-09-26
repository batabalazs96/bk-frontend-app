import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { DataService } from './services/data-service.service';
import { ForecastComponent } from './forecast/forecast.component';
import { PopupComponent } from './popup/popup.component';
import { GeocodingComponent } from './geocoding/geocoding.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    ForecastComponent,
    PopupComponent,
    GeocodingComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
