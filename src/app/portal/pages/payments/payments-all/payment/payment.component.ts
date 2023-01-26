import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Payment} from '../../../../../model/Payment';
import {PopupService} from '../../../../../service/popup.service';
import {Subscription} from 'rxjs';
import {TransactionsService} from '../../../../../service/transactions.service';
import {Router} from '@angular/router';
import {TransferService} from '../../../../../service/transfer.service';

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
  deleteSubscriptionTransaction: Subscription;
  deleteSubscriptionTransfer: Subscription;

  constructor(private popupService: PopupService,
              private transactionService: TransactionsService,
              private transferService: TransferService,
              private router: Router) {
    this.modeDisplayPopup = 'none';
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
    this.popupService.displayPopupWithSetUserSize(event, coordinates, 25, 105);
    this.coordinates = coordinates;
    if (this.modeDisplayPopup === 'none') {
      this.modeDisplayPopup = 'block';
    } else {
      this.modeDisplayPopup = 'none';
    }
  }

  displayInfo(): void {
    alert('This option is not implement, yet!');
  }

  deleteButton(idPayment): void{
    if (this.payment.isInternal === true){
      this.deleteSubscriptionTransfer = this.transferService.deleteTransfer(idPayment).subscribe(
        next => {
          this.ngOnDestroy();
        },
        error => {
          console.log('Problem with server side');
        }
      );
    } else{
      this.deleteSubscriptionTransaction = this.transactionService.deleteTransaction(idPayment).subscribe(
        next => {
          this.ngOnDestroy();
        },
        error => {
          console.log('Problem with server side');
        }
      );
    }

  }

  ngOnDestroy(): void {
    if (this.deleteSubscriptionTransaction != null){
      this.deleteSubscriptionTransaction.unsubscribe();
      this.reloadComponent();
    } else if (this.deleteSubscriptionTransfer != null){
      this.deleteSubscriptionTransfer.unsubscribe();
      this.reloadComponent();
    }
  }


  reloadComponent(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/payments']);
  }

  getColor(): string {
    if (this.payment.balanceAfter || !this.payment.isInternal) {
      return this.payment.value >= 0 ? '#0BD1B8' : '#F31259';
    }
    return '#0b0b0b';
  }
}
