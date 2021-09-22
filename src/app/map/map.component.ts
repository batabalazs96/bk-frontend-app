import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import Overlay from 'ol/Overlay';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {fromLonLat} from 'ol/proj';
import {toStringHDMS} from 'ol/coordinate';
import {toLonLat} from 'ol/proj';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: Map;
  
  ngOnInit(): void {
    const container = document.getElementById('popup');
    const content = document.getElementById('popup-content');
    const closer = document.getElementById('popup-closer');

    const overlay = new Overlay({
      element : container,
      autoPan: true,
      autoPanAnimation: {
        duration: 250,
      },
    });

    closer.onclick = function () {
      overlay.setPosition(undefined);
      closer.blur();
      return false;
    };

    this.map = new Map({
      view: new View({
        center: fromLonLat([19.140789,47.075343]),
        zoom: 8,
      }),
      overlays : [overlay],
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'ol-map'
    });
    this.map.on('singleclick', function (evt) {
      const coordinate = evt.coordinate;
      const hdms = toStringHDMS(toLonLat(coordinate));
    
      content.innerHTML = '<p>You clicked here:</p><code>' + hdms + '</code>';
      overlay.setPosition(coordinate);
      
    });
    }
    
}