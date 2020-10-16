import { EventEmitter, Injectable } from '@angular/core';
import {Transaction} from '../model/Transaction';

@Injectable({
  providedIn: 'root'
})
export class FormResetService {

  resetAccountFormEvent = new EventEmitter<Account>();
  resetTransactionFormEvent = new EventEmitter<Transaction>();
  constructor() { }
}
