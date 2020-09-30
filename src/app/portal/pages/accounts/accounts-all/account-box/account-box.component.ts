import {Component, Input, OnInit} from '@angular/core';
import {PopupService} from '../../../../../service/popup.service';
import {Account, AccountType} from '../../../../../model/Account';
import {FormChangeService} from '../../../../../service/form-change.service';

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

  constructor(private popupService: PopupService, public formChangeService: FormChangeService) { }

  ngOnInit(): void {
    this.modeDisplayPopup = 'none';
    this.currentColor = this.getColor();
  }

  urlToImage(): string{
    if (this.account.accountType === AccountType.CASH){
      return 'wallet-type.png';
    }
    else{
      return 'bank-type.png';
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

  getColor(): string {
    if (AccountBoxComponent.count >= this.colorsArray.length){
      AccountBoxComponent.count = 0;
    }
    return this.colorsArray[AccountBoxComponent.count++];
  }
}
