import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Payment} from '../../../../../model/Payment';
import {PopupService} from '../../../../../service/popup.service';
import {Subscription} from 'rxjs';
import {TransactionService} from '../../../../../service/transaction.service';
import {Router} from '@angular/router';
import {TransferService} from '../../../../../service/transfer.service';
import {FormChangeService} from '../../../../../service/form-change.service';

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
  ifFirst: boolean;
  @Input()
  isLast: boolean;
  @Input()
  isEven: boolean;
  isFullLength: boolean;
  modeDisplayPopup: string;
  coordinates = [];
  deleteSubscriptionTransaction: Subscription;
  deleteSubscriptionTransfer: Subscription;

  constructor(private popupService: PopupService,
              private transactionService: TransactionService,
              private transferService: TransferService,
              private formChangeService: FormChangeService,
              private router: Router) {
    this.modeDisplayPopup = 'none';
  }

  ngOnInit(): void {
    this.isFullLength = false;
    if (this.ifFirst) {
      this.border = '10px 10px 0 0';
    } else if (this.isLast) {
      this.border = '0 0 10px 10px';
    }
    if (this.isEven) {
      this.backgroundColor = '#ffffff';
    } else {
      this.backgroundColor = '#F6F6F6';
    }
  }

  toggleFullLength(): void {
    this.isFullLength = this.isFullLength !== true;
  }

  displayPopup(event: MouseEvent): void {
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

  deleteButton(idPayment: number): void{
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

  editAction() {
    if (this.payment.isInternal) {
      this.formChangeService.changeFormToEditTransfer(this.payment);
    } else{
      this.formChangeService.changeFormToEditTransaction(this.payment);
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
