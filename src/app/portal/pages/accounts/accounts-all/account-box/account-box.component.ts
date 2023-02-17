import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PopupService} from '../../../../../service/popup.service';
import {Account, AccountType} from '../../../../../model/Account';
import {FormChangeService} from '../../../../../service/form-change.service';
import {AccountsService} from '../../../../../service/accounts.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-account-box',
  templateUrl: './account-box.component.html',
  styleUrls: ['./account-box.component.css']
})
export class AccountBoxComponent implements OnInit {
  static count = 0;
  @Input()
  account: Account;
  modeDisplayPopup: string;
  coordinates = [];
  colorsArray = ['#F4BB4A', '#F31259', '#FF7D44', '#564193'];
  currentColor: string;
  @Output()
  dataChangedEvent = new EventEmitter();

  constructor(private popupService: PopupService,
              private accountsService: AccountsService,
              private router: Router,
              public formChangeService: FormChangeService) {
  }

  ngOnInit(): void {
    this.modeDisplayPopup = 'none';
    this.currentColor = this.getColor();
  }

  urlToImage(): string {
    switch (this.account.accountType) {
      case AccountType.BANK:
        return 'bank-type.png';
      case AccountType.CASH:
        return 'wallet-type.png';
      case AccountType.LOAN:
        return 'loan-type.png';
    }
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

  changeFormToEdit(): void {
    this.formChangeService.changeFormToEdit(this.account);
  }

  deleteAccount(): void {
    this.accountsService.deleteAccount(this.account).subscribe(
      (next) => {
        this.dataChangedEvent.emit();
        this.redirectTo('accounts');
      });
  }

  getColor(): string {
    if (AccountBoxComponent.count >= this.colorsArray.length) {
      AccountBoxComponent.count = 0;
    }
    return this.colorsArray[AccountBoxComponent.count++];
  }

  redirectTo(uri: string): void {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
  }
}
