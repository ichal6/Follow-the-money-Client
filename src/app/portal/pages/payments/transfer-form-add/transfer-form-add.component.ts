import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {Account} from '../../../../model/Account';
import {Subscription} from 'rxjs';
import {AccountsService} from '../../../../service/accounts.service';
import {FormResetService} from '../../../../service/form-reset.service';
import {Router} from '@angular/router';
import {Transfer} from '../../../../model/Transfer';
import {TransferService} from '../../../../service/transfer.service';
import {PaymentsService} from "../../../../service/payments.service";

@Component({
  selector: 'app-transfer-form-add',
  templateUrl: './transfer-form-add.component.html',
  styleUrls: ['./transfer-form-add.component.css', '../transaction-form-add/transaction-form-add.component.css']
})
export class TransferFormAddComponent implements OnInit, OnDestroy {
  newTransfer: Transfer;
  information: string;
  allAccounts: Array<Account>;
  dataChangedEvent = new EventEmitter();

  isAccountIdValid = false;
  isValueValid = false;
  isDateValid = false;
  isTitleValid = false;
  isAccountIsDifferent = false;

  subscribe: Subscription;
  transferResetSubscription: Subscription;

  constructor(private accountsService: AccountsService,
              private transferService: TransferService,
              private paymentService: PaymentsService,
              private formResetService: FormResetService,
              private router: Router) { }

  ngOnInit(): void {
    this.newTransfer = new Transfer();
    this.newTransfer.accountIdTo = null;
    this.newTransfer.accountIdFrom = null;
    this.newTransfer.date = this.paymentService.getLocalISODatetime();
    this.isDateValid = true;
    this.transferResetSubscription = this.formResetService.resetTransferFormEvent.subscribe(
      transfer => {
        this.newTransfer = transfer;
      }
    );
    this.subscribe = this.accountsService.getAccounts().subscribe(
      next => {
        this.allAccounts = next;
      }
    );
  }

  ngOnDestroy(): void {
    this.transferResetSubscription.unsubscribe();
  }

  onSubmit(): void {
    this.information = 'Saving new transfer...';
    const timeWithZone = this.newTransfer.date;
    this.newTransfer.date = this.paymentService.getUTCISODateTime(new Date(this.newTransfer.date));
    this.transferService.addTransfer(this.newTransfer).subscribe({
        next: () => {
        this.dataChangedEvent.emit();
        this.redirectTo('payments');
      },
        error: (err) => {
        this.information = err.message;
        this.newTransfer.date = timeWithZone;
      }
    });
  }

  checkIfAccountIsValid(): void {
    this.checkIfAccountIdIsValid();
    this.checkIfAccountIsDifferent();
  }

  checkIfAccountIdIsValid(): void {
    this.isAccountIdValid = this.newTransfer.accountIdTo != null && this.newTransfer.accountIdFrom &&
      !isNaN(Number(this.newTransfer.accountIdFrom.toString())) && !isNaN(Number(this.newTransfer.accountIdFrom.toString()));
  }

  checkIfAccountIsDifferent(): void {
    this.isAccountIsDifferent = this.newTransfer.accountIdFrom !== this.newTransfer.accountIdTo;
  }

  checkIfValueIsValid(): void {
    this.isValueValid = ((this.newTransfer.value != null) &&
      (this.newTransfer.value.toString() !== '') &&
      (!isNaN(Number(this.newTransfer.value.toString()))) &&
      (Number(this.newTransfer.value.toString()) > 0)
    );
  }

  checkIfDateIsValid(): void {
    this.isDateValid = this.newTransfer.date != null;
  }

  checkIfTitleIsValid(): void {
    if (this.newTransfer.title) {
      this.isTitleValid = this.newTransfer.title.trim().length >= 3;
    } else {
      this.isTitleValid = false;
    }
  }

  redirectTo(uri: string): void {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
  }
}
