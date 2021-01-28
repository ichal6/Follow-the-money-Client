import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Payment} from '../../../../../model/Payment';
import {PopupService} from '../../../../../service/popup.service';
import {Subscription} from 'rxjs';
import {TransactionsService} from '../../../../../service/transactions.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit, OnDestroy {
  @Input()
  public payment: Payment;
  @Input()
  border: string;
  @Input()
  backgroundColor: string;
  @Input()
  first: any;
  @Input()
  last: any;
  @Input()
  even: any;
  isFullLength: boolean;
  modeDisplayPopup: string;
  coordinates = [];
  deleteSubscription: Subscription;

  constructor(private popupService: PopupService,
              private transactionService: TransactionsService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.isFullLength = false;
    if (this.first) {
      this.border = '10px 10px 0 0';
    } else if (this.last) {
      this.border = '0 0 10px 10px';
    }
    if (this.even) {
      this.backgroundColor = '#ffffff';
    } else {
      this.backgroundColor = '#F6F6F6';
    }
  }

  toggleIsFullLength(): void {
    this.isFullLength = this.isFullLength !== true;
  }

  displayPopup(event): void {
    const coordinates = [];
    this.popupService.displayPopup(event, coordinates);
    this.coordinates = coordinates;
    if (this.modeDisplayPopup === 'none') {
      this.modeDisplayPopup = 'block';
    } else {
      this.modeDisplayPopup = 'none';
    }
  }

  deleteButton(idTransaction): void{
    if (this.payment.isInternal === true){
      console.log('To jest transfer!');
      return;
    }
    this.deleteSubscription = this.transactionService.deleteTransaction(idTransaction).subscribe(
      next => {
        this.ngOnDestroy();
      },
      error => {
        console.log('Problem with server side');
      }
    );
  }

  ngOnDestroy(): void {
    if (this.deleteSubscription != null){
      this.deleteSubscription.unsubscribe();
      this.reloadComponent();
    }
  }


  reloadComponent(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/payments']);
  }
}
