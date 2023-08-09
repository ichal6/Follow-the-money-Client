import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Payment} from '../model/Payment';
import {HttpClient} from '@angular/common/http';
import {Transfer} from '../model/Transfer';
import {DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor(private http: HttpClient,
              private dataService: DataService) {
  }

  addTransfer(newTransfer: Transfer): Observable<any> {
    const transferToAdd = {
      id: newTransfer.id,
      title: newTransfer.title,
      value: newTransfer.value,
      accountIdFrom: newTransfer.accountIdFrom,
      accountIdTo: newTransfer.accountIdTo,
      date: newTransfer.date};
    return this.http.post<any>(environment.restUrl + '/api/payment/transfer/' + this.dataService.getEmail(), transferToAdd , {withCredentials : true});
  }

  deleteTransfer(idTransfer): Observable<Payment>{
    return this.http.delete<null>(
      environment.restUrl + '/api/payment/transfer/' + idTransfer,
      {withCredentials: true});
  }

  getTransfer(id: number): Observable<Transfer> {
    return this.http.get<Transfer>(
      environment.restUrl + "/api/payment/transfer/" + this.dataService.getEmail() + "/" + id,
      {withCredentials: true}
    );
  }

  updateTransfer(transfer: Transfer) : Observable<void> {
    return this.http.put<null>(
      environment.restUrl + '/api/payment/transfer',
      transfer,
      {withCredentials: true}
    );
  }
}
