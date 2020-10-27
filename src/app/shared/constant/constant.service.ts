import {Injectable} from '@angular/core';

import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {

  private API_URL: string;

  constructor() {
    this.API_URL = environment.API_URL;
  }

  getUrl(path: string): string {
    return [this.API_URL, path].join('');
  }

}
