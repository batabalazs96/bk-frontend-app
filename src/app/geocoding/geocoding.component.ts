import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  Input,
  SimpleChanges,
} from '@angular/core';
import { toLonLat } from 'ol/proj';
import { DataService } from '../services/data-service.service';
import { CityWeather } from '../shared/models/city-weather.model';

@Component({
  selector: 'app-geocoding',
  templateUrl: './geocoding.component.html',
  styleUrls: ['./geocoding.component.css'],
})
export class GeocodingComponent implements OnInit {
  @Input()
  coordinate: number[];

  @Output()
  clickedCityWeather: EventEmitter<CityWeather> = new EventEmitter<CityWeather>();

  constructor(private data: DataService) {}

  ngOnInit(): void {}
  //Új lekérést indít ha máshová kattintott a user
  ngOnChanges(changes: SimpleChanges) {
    this.cityWeatherLookup(changes.coordinate.currentValue);
  }

  //lekéri az adatokat az API-ból a service segítségével
  cityWeatherLookup(coordinate) {
    this.data.getCityName(coordinate[0], coordinate[1]).subscribe((res) => {
      let cityName = res.displayName;
      this.data
        .getWeatherData(coordinate[0], coordinate[1])
        .subscribe((res) => {
          let iconURL = `https://openweathermap.org/img/wn/${res.icon}@2x.png`;
          this.clickedCityWeather.emit(
            new CityWeather(
              res.latitude,
              res.longitude,
              cityName,
              Math.round(res.celsious),
              res.main,
              iconURL,
              res.daily
            )
          );
        });
    });
  }
}
