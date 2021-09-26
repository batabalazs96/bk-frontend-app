import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CityWeather } from '../shared/models/city-weather.model';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css'],
})
export class ForecastComponent implements OnInit {
  @Input() cityWeather: CityWeather;

  currentCity: string;
  forecasts = [];

  constructor() {}

  ngOnInit(): void {}
  //Amennyiben máshová kattintott a user újrafuttatja a createForecastData metódust
  //ezzel frissítve az előrejelzés adatait az aktuális koordinátához tartozókra
  ngOnChanges(changes: SimpleChanges) {
    this.createForecastData(changes.cityWeather.currentValue);
  }

  //Feltölti adatokkal az előrejelzés elkészítéséhez használt objektumokból álló tömböt.
  createForecastData(cityWeather) {
    this.currentCity = cityWeather.cityName;
    let forecasts = [];
    let weekdays = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    let days = cityWeather.daily;
    for (let i = 1; i < 6; i++) {
      const day = days[i];
      let date = new Date(day.dt * 1000);
      forecasts.push({
        day: weekdays[date.getDay()],
        temp: Math.round(day.temp.day),
        main: day.weather[0].main,
        icon: day.weather[0].icon,
      });
    }
    this.forecasts = forecasts;
  }
}
