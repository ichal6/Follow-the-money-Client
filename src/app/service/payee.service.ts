import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {Payee} from '../model/Payee';
import {Observable} from 'rxjs';
import {DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class PayeeService {
  constructor(private http: HttpClient,
              private dataService: DataService) {
  }

  getPayees(): Observable<Array<Payee>>{
    return this.http.get<Array<Payee>>(environment.restUrl + '/api/payee/' + this.dataService.getEmail(), {withCredentials: true})
      .pipe(
        map(
          data => {
            const payees = new Array<Payee>();
            for (const payee of data) {
              payees.push(Payee.fromHttp(payee));
            }
            return payees.sort((a, b) => a.name.localeCompare(b.name));
          }
        )
      );
  }

  deletePayee(id): Observable<any>{
    return this.http.delete<null>(environment.restUrl + '/api/payee/' + this.dataService.getEmail() + '/' + id,
      {withCredentials: true});
  }

  createNewPayee(newPayee: Payee): Observable<any>{
    const payeeJSON = {name: newPayee.name};
    return this.http.post<null>(environment.restUrl + '/api/payee/' + this.dataService.getEmail(), payeeJSON, {withCredentials : true});
  }

  updatePayee(updatedPayee: Payee): Observable<any>{
    return this.http.put<null>(environment.restUrl + '/api/payee/' + this.dataService.getEmail() + '/' + updatedPayee.id, updatedPayee.name,
      {withCredentials : true});
  }
}
