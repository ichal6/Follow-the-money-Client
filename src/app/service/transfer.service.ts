import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Payment} from '../model/Payment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor(private http: HttpClient) { }

  deleteTransfer(idTransfer): Observable<Payment>{
    return this.http.delete<null>(
      environment.restUrl + '/api/payment/transfer/' + idTransfer,
      {withCredentials: true});
  }
}
