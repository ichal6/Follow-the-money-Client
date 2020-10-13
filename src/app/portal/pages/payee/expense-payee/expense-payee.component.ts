import {Component, OnDestroy, OnInit} from '@angular/core';
import {Payee} from '../../../../model/Payee';
import {PayeeService} from '../../../../service/payee.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-expense-payee',
  templateUrl: './expense-payee.component.html',
  styleUrls: ['./expense-payee.component.css']
})
export class ExpensePayeeComponent implements OnInit, OnDestroy {
  payees = new Array<Payee>();
  subscription: Subscription;

  constructor(private payeeService: PayeeService) { }

  ngOnInit(): void {
    this.subscription = this.payeeService.getPayeeByExpense().subscribe(
      payeesFromServer => {
        this.payees = payeesFromServer;
      },
      error => {
        console.log('Problem with server side', error);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription != null){
      this.subscription.unsubscribe();
    }
  }

}
