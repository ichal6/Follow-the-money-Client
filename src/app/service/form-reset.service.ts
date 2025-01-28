import { EventEmitter, Injectable } from '@angular/core';
import {Transfer} from '../model/Transfer';
import {Account} from '../model/Account';

@Injectable({
  providedIn: 'root'
})
export class FormResetService {

  resetAccountFormEvent = new EventEmitter<Account>();
  resetTransferFormEvent = new EventEmitter<Transfer>();
}
