import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import Overlay from 'ol/Overlay';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';

import { toLonLat } from 'ol/proj';
import { DataService } from '../services/data-service.service';
import { CityWeather } from '../shared/models/city-weather.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  constructor(private data: DataService) {}

  map: Map;
  overlay: Overlay;
  cityWeather: CityWeather;
  //Létrehozza a térképet
  initializeMap() {
    const container = document.getElementById('popup');
    this.overlay = new Overlay({
      element: container,
      autoPan: true,
      autoPanAnimation: {
        duration: 250,
      },
    });

    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      overlays: [this.overlay],
      target: 'ol-map',
      view: new View({
        center: fromLonLat([19.140789, 47.075343]),
        zoom: 8,
      }),
    });
  }
  //Átveszi az kiválaszott város időjárására vonatkozó adatokat a popup komponenstől,
  //hogy tovább tudja adni azokat a forecast komponensnek
  getCityWeather(cityWeather) {
    this.cityWeather = cityWeather;
  }

  ngOnInit(): void {
    this.initializeMap();
  }
}
