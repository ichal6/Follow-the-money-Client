import {Component, Input, OnInit} from '@angular/core';
import {Account, AccountType} from '../../../../../model/Account';

@Component({
  selector: 'app-popular-account-box',
  templateUrl: './popular-account-box.component.html',
  styleUrls: ['./popular-account-box.component.css']
})
export class PopularAccountBoxComponent implements OnInit {
  static count = 0;
  @Input()
  account: Account;
  colorsArray = ['#F4BB4A', '#F31259', '#FF7D44', '#564193'];
  currentColor: string;

  constructor() {
  }

  ngOnInit(): void {
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

  getColor(): string {
    if (PopularAccountBoxComponent.count >= this.colorsArray.length){
      PopularAccountBoxComponent.count = 0;
    }
    return this.colorsArray[PopularAccountBoxComponent.count++];
  }
}
