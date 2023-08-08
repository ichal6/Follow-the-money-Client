import {Component, OnInit} from '@angular/core';
import {FormChangeService} from '../../../../service/form-change.service';
import {AccountsService} from '../../../../service/accounts.service';

import {Router} from '@angular/router';
import {Transfer} from '../../../../model/Transfer';
import {TransferService} from '../../../../service/transfer.service';
import {Account} from '../../../../model/Account';

@Component({
  selector: 'app-transfer-form-edit',
  templateUrl: './transfer-form-edit.component.html',
  styleUrls: ['./transfer-form-edit.component.css']
})
export class TransferFormEditComponent implements OnInit{
  message: string;
  updateTransfer: Transfer;
  allAccounts: Array<Account>;

  constructor(public formChangeService: FormChangeService) { }

  ngOnInit(): void {
    this.updateTransfer = new Transfer();
  }

  returnToTransfer(): void {
    this.formChangeService.changeFormToTransfer();
  }

  isTitleValid() {
    return false;
  }

  isDateIsValid() {
    return false;
  }

  isValueIsValid() {
    return false;
  }

  onSubmit() {

  }

  isTransferValid() {
    return false;
  }
}
