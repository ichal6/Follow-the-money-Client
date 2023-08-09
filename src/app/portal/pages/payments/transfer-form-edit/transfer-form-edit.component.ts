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
  subscriptionGet: Subscription;
  subscriptionPut: Subscription;

  constructor(public formChangeService: FormChangeService,
              private transferService: TransferService,
              private accountsService: AccountsService,
              private validator: ValidatorService,
              private router: Router) { }

  ngOnInit(): void {
    this.updateTransfer = new Transfer();
    this.loadTransfer();
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

  isAccountsIsValid(): boolean {
    return this.validator.checkIfAccountIsDifferent(this.updateTransfer.accountIdFrom, this.updateTransfer.accountIdTo);
  }

  onSubmit() {
    this.message = 'Update a transfer...';
    this.subscriptionPut = this.transferService.updateTransfer(this.updateTransfer).subscribe( {
      next: () =>   this.redirectTo('payments'),
      error: (err) => this.message = err.message
    });
  }

  isTransferValid() {
    return this.isTitleValid() &&
      this.isDateIsValid() &&
      this.isValueIsValid() &&
      this.isAccountsIsValid();
  }

  private loadAccounts(): void {
    this.subscriptionAccounts = this.accountsService.getAccounts().subscribe({
      next: (res) => this.allAccounts = res,
      error: (err) => this.message = err.message,
      complete: () => console.log("Completed fetch accounts")
    })
  }

  private loadTransfer() {
    this.subscriptionGet = this.transferService.getTransfer(this.formChangeService.payment.id).subscribe({
      next: (res) => this.updateTransfer = Transfer.fromHttp(res),
      error: err => this.message = 'Problem with loading the transfer: ' + err.message,
      complete: () => console.log('Completed fetch transfer to edit')
    });
  }

  redirectTo(uri: string): void {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
  }

  ngOnDestroy(): void {
    this.subscriptionAccounts?.unsubscribe();
    this.subscriptionGet?.unsubscribe();
    this.subscriptionPut?.unsubscribe();
  }
}
