import { Component, OnInit } from '@angular/core';
import {Account} from '../../../model/Account';
import {Subscription} from 'rxjs';
import {AccountsService} from '../../../service/accounts.service';
import {FormChangeService} from '../../../service/form-change.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  public accounts: Array<Account>;
  private subscribe: Subscription;

  constructor(private accountsService: AccountsService, public formChangeService: FormChangeService) { }

  ngOnInit(): void {
    this.formChangeService.formAction = 'add';
    this.subscribe = this.accountsService.getAccounts().subscribe(
      next => {
        this.accounts = next;
      },
      error => {
        console.log('problem with getting the accounts: ', error);
      }
    );
  }

}
