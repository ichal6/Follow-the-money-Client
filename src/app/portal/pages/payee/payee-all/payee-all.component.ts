import {Component, OnDestroy, OnInit} from '@angular/core';
import {Payee} from '../../../../model/Payee';
import {Subscription} from 'rxjs';
import {PayeeService} from '../../../../service/payee.service';

@Component({
  selector: 'app-payee-all',
  templateUrl: './payee-all.component.html',
  styleUrls: ['./payee-all.component.css']
})
export class PayeeAllComponent implements OnInit, OnDestroy {
  payees = new Array<Payee>();
  subscription: Subscription;

  constructor(private payeeService: PayeeService) { }

  ngOnInit(): void {
    this.subscription = this.payeeService.getPayees().subscribe(
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
