import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

import {IReport, WeatherForecastService} from '../../shared/weather-forecast/weather-forecast.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public search = '';
  public type = '';
  public searchData: any;

  public date = new Date();

  public reportDetails: IReport;

  private cityList = [];

  constructor(
    private toasterService: ToastrService,
    private weatherForecastService: WeatherForecastService
  ) {
  }

  ngOnInit(): void {
    this.cityList = JSON.parse(localStorage.getItem('cityList')) || [];

    this.searchData = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        map(term => term.length < 1 ? []
          : this.cityList.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
      );
  }

  getReport(): void {
    const params = {
      appid: environment.API_KEY,
      q: this.search
    };
    const path = this.type === 'current' ? 'weather' : 'forecast/hourly';

    if (this.type === '16 days') {
      params['cnt'] = 16;
    }

    this.cityList.push(this.search);
    this.cityList = [...new Set(this.cityList)];

    localStorage.setItem('cityList', JSON.stringify(this.cityList));

    this.weatherForecastService.getReports(path, params).subscribe((res: IReport) => {
      this.reportDetails = res;
    }, (error) => {
      this.toasterService.error(`${error.error.message}`);
    });
  }

  getButtonStatus(): boolean {
    return !!(this.search && this.type);
  }

  temperatureConverter(temperature): number {
    const kelvin = parseFloat(temperature);
    return (kelvin - 273);
  }

}
