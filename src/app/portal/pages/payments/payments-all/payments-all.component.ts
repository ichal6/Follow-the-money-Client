import { Component, OnInit } from '@angular/core';
import {Payment} from '../../../../model/Payment';
import {Subscription} from 'rxjs';
import {PaymentsService} from '../../../../service/payments.service';
import {AccountsService} from '../../../../service/accounts.service';
import {Account, NoAccount} from '../../../../model/Account';

@Component({
  selector: 'app-payments-all',
  templateUrl: './payments-all.component.html',
  styleUrls: ['./payments-all.component.css']
})
export class PaymentsAllComponent implements OnInit {
  public payments: Array<Payment>;
  private subscribe: Subscription;
  public allAccounts: Array<Account>;
  public account: Account;
  public noAccount: NoAccount;
  public periodInDays: number;
  constructor(private paymentsService: PaymentsService,
              private accountsService: AccountsService) { }

  ngOnInit(): void {
    this.noAccount = new NoAccount();
    this.account = this.noAccount;
    this.periodInDays = 0;
    this.subscribe = this.accountsService.getAccounts().subscribe(
      next => {
        this.allAccounts = next;
      },
      error => {
        console.log('problem with loading the accounts: ', error);
      }
    );
    this.requestPayments();
  }

  requestPayments(): void {
    this.subscribe = this.paymentsService.getPayments(this.account.id, this.periodInDays).subscribe(
      next => {
        this.payments = next;
      },
      error => {
        console.log('problem with getting the payments: ', error);
      }
    );
  }
}
