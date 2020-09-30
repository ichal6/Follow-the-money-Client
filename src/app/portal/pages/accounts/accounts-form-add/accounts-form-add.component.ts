import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Account, AccountType} from '../../../../model/Account';

@Component({
  selector: 'app-accounts-form-add',
  templateUrl: './accounts-form-add.component.html',
  styleUrls: ['./accounts-form-add.component.css']
})
export class AccountsFormAddComponent implements OnInit {
  newAccount: Account;
  message: string;

  @Output()
  dataChangedEvent = new EventEmitter();

  isNameValid = false;
  isTypeValid = false;
  isBalanceValid = false;

  constructor() { }

  ngOnInit(): void {
    this.newAccount = new Account();
    this.newAccount.accountType = null;
  }

  onSubmit(): void {
    this.message = 'Saving new account...';
    console.log(this.message);
  }

  checkIfNameIsValid(): void {
    if (this.newAccount.name) {
      this.isNameValid = this.newAccount.name.trim().length >= 3;
    } else {
      this.isNameValid = false;
    }
  }

  checkIfTypeIsValid(): void {
    this.isTypeValid = (this.newAccount.accountType.toUpperCase() === AccountType.BANK
    || this.newAccount.accountType.toUpperCase() === AccountType.CASH);
      // || this.newAccount.accountType === AccountType.CASH;
    console.log(this.isTypeValid);
  }
}
