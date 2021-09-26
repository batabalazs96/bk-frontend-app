import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import Map from 'ol/Map';
import Overlay from 'ol/Overlay';
import { toStringHDMS } from 'ol/coordinate';
import { DataService } from '../services/data-service.service';
import { toLonLat } from 'ol/proj';
import { CityWeather } from '../shared/models/city-weather.model';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent implements OnInit {
  constructor(private data: DataService) {}

  @Input() map: Map;
  @Input() overlay: Overlay;
  coordinate: number[];

  @Output()
  cityWeather = new EventEmitter();

  popupContentData: CityWeather;

  initializePopup() {
    const closer = document.getElementById('popup-closer');
    this.map.on('singleclick', (evt) => {
      this.getClickCoordinate(evt.coordinate);
      this.overlay.setPosition(evt.coordinate);
    });
    closer.onclick = () => {
      this.closePopup();
    };
  }
  // Bezárja a popupot és a hozzá tartozó előrejelzést
  closePopup() {
    const closer = document.getElementById('popup-closer');
    this.overlay.setPosition(undefined);
    closer.blur();
    this.cityWeather.emit(null);
    return false;
  }
  //Elmenti a klikkelés koordinátáját
  getClickCoordinate(coordinate) {
    this.coordinate = toLonLat(coordinate);
  }
  //Feltölti a popup tartalmának létrehozásához használt property-t
  fillPopupContentData(res: CityWeather) {
    this.cityWeather.emit(res);
    this.popupContentData = res;
  }

  ngOnInit(): void {
    this.initializePopup();
  }
}
