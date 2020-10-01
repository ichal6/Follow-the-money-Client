import { Injectable } from '@angular/core';
import {Account} from '../model/Account';

@Injectable({
  providedIn: 'root'
})
export class FormChangeService {
  public formAction = 'add';
  public account: Account;

  constructor() { }

  changeFormToEdit(accountToUpdate: Account): void {
    this.formAction = 'edit';
    this.account = accountToUpdate;
  }
}
