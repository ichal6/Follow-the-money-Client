import { Injectable } from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {Dashboard} from '../model/Dashboard';
import {DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class PrefetchDashboardService implements Resolve<Observable<Dashboard>>{

  constructor(private dataService: DataService) { }

  resolve(): Observable<Dashboard> {
    return this.dataService.getDashboard();
  }
}
