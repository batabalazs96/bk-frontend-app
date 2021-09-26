import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NominatimResponse } from '../shared/models/nominatim-response.model';
import { OpenWeatherResponse } from '../shared/models/openweather-response.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getCityName(lon, lat): Observable<NominatimResponse> {
    let url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`;
    return this.http.get<NominatimResponse>(url).pipe(
      map((data: Object) => {
        let firstCity = data['display_name'].split(',');
        return new NominatimResponse(data['lon'], data['lat'], firstCity[0]);
      })
    );
  }

  getWeatherData(lon, lat) {
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly&appid=e53d67d76ed7dbe26f675bbfa97475ae`;
    return this.http.get<OpenWeatherResponse>(url).pipe(
      map((data: Object) => {
        return new OpenWeatherResponse(
          data['lon'],
          data['lat'],
          data['current']['temp'],
          data['current']['weather'][0]['main'],
          data['current']['weather'][0]['icon'],
          data['daily']
        );
      })
    );
  }
}
