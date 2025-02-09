import {Component, OnDestroy, OnInit} from '@angular/core';
import {Payee} from '../../../../model/Payee';
import {Subscription} from 'rxjs';
import {PayeeService} from '../../../../service/payee.service';

@Component({
  selector: 'app-payee-all',
  templateUrl: './payee-all.component.html',
  styleUrls: ['./payee-all.component.css'],
  standalone: false
})
export class PayeeAllComponent implements OnInit, OnDestroy {
  payees = new Array<Payee>();
  getPayeesSubscription: Subscription;

  constructor(private payeeService: PayeeService) { }

  ngOnInit(): void {
    this.loadPayees()
  }

  loadPayees(): void {
     this.getPayeesSubscription = this.payeeService.getPayees().subscribe({
      next: payeesFromServer => {
        this.payees = payeesFromServer;
      },
      error: err => {
        console.log('Problem with server side', err.error);
      }
    });
  }

  ngOnDestroy(): void {
    this.getPayeesSubscription?.unsubscribe();
  }
}
