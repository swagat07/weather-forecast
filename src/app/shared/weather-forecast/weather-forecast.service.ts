import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {ConstantService} from '../constant/constant.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastService {

  constructor(
    private http: HttpClient,
    private constantService: ConstantService
  ) {
  }

  getReports(path: string, params) {
    return this.http.get(this.constantService.getUrl(`${path}`), {
      params: params
    });
  }

}

export interface IReport {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
    ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  rain: {
    '1h': number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}
