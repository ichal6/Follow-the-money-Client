import {Component, Input, OnInit} from '@angular/core';
import {PopupService} from '../../../../../service/popup.service';
import {Account, AccountType} from '../../../../../model/Account';

@Component({
  selector: 'app-popular-account-box',
  templateUrl: './popular-account-box.component.html',
  styleUrls: ['./popular-account-box.component.css']
})
export class PopularAccountBoxComponent implements OnInit {
  static count = 0;
  modeDisplayPopup: string;
  @Input()
  account: Account;
  coordinates = [];
  colorsArray = ['#F4BB4A', '#F31259', '#FF7D44', '#564193'];
  currentColor: string;

  constructor(private popupService: PopupService) {
  }

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

  getColor(): string {
    if (PopularAccountBoxComponent.count >= this.colorsArray.length){
      PopularAccountBoxComponent.count = 0;
    }
    return this.colorsArray[PopularAccountBoxComponent.count++];
  }
}
