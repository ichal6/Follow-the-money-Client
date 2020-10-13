import { Component, OnInit } from '@angular/core';
import {Payee} from '../../../../model/Payee';
import {PayeeService} from '../../../../service/payee.service';

@Component({
  selector: 'app-expense-payee',
  templateUrl: './expense-payee.component.html',
  styleUrls: ['./expense-payee.component.css']
})
export class ExpensePayeeComponent implements OnInit {
  payees = new Array<Payee>();

  constructor(private payeeService: PayeeService) { }

  ngOnInit(): void {
    this.payeeService.getPayeeByExpense().subscribe(
      payeesFromServer => {
        this.payees = payeesFromServer;
      },
      error => {
        console.log('Problem with server side', error);
      }
    );
  }

}
