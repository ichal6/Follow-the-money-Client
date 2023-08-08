import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormChangeService} from '../../../../service/form-change.service';
import {AccountsService} from '../../../../service/accounts.service';

import {Router} from '@angular/router';
import {Transfer} from '../../../../model/Transfer';
import {TransferService} from '../../../../service/transfer.service';
import {Account} from '../../../../model/Account';
import {ValidatorService} from '../../../../service/common/validator.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-transfer-form-edit',
  templateUrl: './transfer-form-edit.component.html',
  styleUrls: ['./transfer-form-edit.component.css', '../transaction-form-add/transaction-form-add.component.css',
    '../transaction-form-edit/transaction-form-edit.component.css']
})
export class TransferFormEditComponent implements OnInit, OnDestroy {
  message: string;
  updateTransfer: Transfer;
  allAccounts: Array<Account>;
  subscriptionAccounts: Subscription;

  constructor(public formChangeService: FormChangeService,
              private transferService: TransferService,
              private accountsService: AccountsService,
              private validator: ValidatorService,
              private router: Router) { }

  ngOnInit(): void {
    this.updateTransfer = new Transfer();
    this.loadAccounts();
  }

  returnToTransfer(): void {
    this.formChangeService.changeFormToTransfer();
  }

  isTitleValid() {
    return this.validator.checkIfTitleIsValid(this.updateTransfer.title);
  }

  isDateIsValid() {
    return this.validator.checkIfDateIsValid(this.updateTransfer.date);
  }

  isValueIsValid() {
    return this.validator.checkIfValueIsValid(this.updateTransfer.value);
  }

  onSubmit() {
    this.message = 'Update a transfer...';
  }

  isTransferValid() {
    return this.isTitleValid() &&
      this.isDateIsValid() &&
      this.isValueIsValid();
  }

  private loadAccounts(): void {
    this.subscriptionAccounts = this.accountsService.getAccounts().subscribe({
      next: (res) => this.allAccounts = res,
      error: (err) => this.message = err.error,
      complete: () => console.log("Completed fetch accounts")
    })
  }

  ngOnDestroy(): void {
    this.subscriptionAccounts?.unsubscribe();
  }
}
