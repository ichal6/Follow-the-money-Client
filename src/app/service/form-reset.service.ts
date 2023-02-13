import { EventEmitter, Injectable } from '@angular/core';
import {Transaction} from '../model/Transaction';
import {Transfer} from '../model/Transfer';

@Injectable({
  providedIn: 'root'
})
export class FormResetService {

  resetAccountFormEvent = new EventEmitter<Account>();
  resetTransactionFormEvent = new EventEmitter<Transaction>();
  resetTransferFormEvent = new EventEmitter<Transfer>();
  constructor() { }
}
