import { Injectable } from '@angular/core';

import {Observable} from 'rxjs';
import {Dashboard} from '../model/Dashboard';
import {DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class PrefetchDashboardService {

  constructor(private dataService: DataService) { }

  resolve(): Observable<Dashboard> {
    return this.dataService.getDashboard();
  }
}
