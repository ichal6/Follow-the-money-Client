import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {AnalysisTableRow} from '../model/AnalysisTableRow';
import {DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

  constructor(private http: HttpClient,
              private dataService: DataService) {
  }

  getAnalysisDataRows(startDate?: string, type?: string): Observable<Array<AnalysisTableRow>> {
    let url = environment.restUrl + '/api/analysis/' + this.dataService.getEmail() + '?';
    if (typeof startDate !== 'undefined' && startDate !== null) {
      url += 'start=' + startDate;
    }
    if (type !== undefined) {
      url += '&type=' + type;
    }
    return this.http.get<Array<AnalysisTableRow>>(url,
      {withCredentials: true})
      .pipe(
        map(data => {
          return this.extractAnalysisTableRowFromJSON(data);
        }),
        map(arr => arr.sort((a: AnalysisTableRow, b: AnalysisTableRow) => a.balance - b.balance))
      );
  }

  validateParams(eventData?: { period: number, type: string }) {
    let startDate = '1970-01-01';
    let type = "accounts";
    if(eventData !== undefined && eventData.period > 0) {
      const date = new Date();
      date.setDate(new Date().getDate() - eventData.period);
      startDate = date.toISOString().substring(0,10);
    }
    if(eventData !== undefined && eventData.type !== undefined) {
      type = eventData.type;
    }
    return {startDate, type};
  }


  private extractAnalysisTableRowFromJSON(dataJSON): Array<AnalysisTableRow> {
    const analysisTableRowsTS = new Array<AnalysisTableRow>();

    for (const row of dataJSON) {
      analysisTableRowsTS.push(AnalysisTableRow.fromHttp(row));
    }
    return analysisTableRowsTS;
  }
}
