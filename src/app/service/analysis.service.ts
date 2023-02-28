import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {AnalysisTableRow} from '../model/AnalysisTableRow';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {
  private email: string;

  constructor(private http: HttpClient,
              private cookieService: CookieService) {
    this.setEmailFromCookie()
  }

  getAnalysisDataRows(startDate?: string): Observable<Array<AnalysisTableRow>> {
    let url = environment.restUrl + '/api/analysis/' + this.email + '?';
    if (typeof startDate !== 'undefined' && startDate !== null) {
      url += 'start=' + startDate;
    }
    return this.http.get<Array<AnalysisTableRow>>(url,
      {withCredentials: true})
      .pipe(
        map(data => {
          return this.extractAnalysisTableRowFromJSON(data);
        })
      );
  }

  private extractAnalysisTableRowFromJSON(dataJSON): Array<AnalysisTableRow> {
    const analysisTableRowsTS = new Array<AnalysisTableRow>();

    for (const row of dataJSON) {
      analysisTableRowsTS.push(AnalysisTableRow.fromHttp(row));
    }
    return analysisTableRowsTS;
  }

  setEmailFromCookie(): void{
    if (this.cookieService.check('e-mail')){
      this.email = this.cookieService.get('e-mail');
    }
  }
}
