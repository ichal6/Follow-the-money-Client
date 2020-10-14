import {Component, Input, OnInit} from '@angular/core';
import {Payment} from '../../../../../model/Payment';
import {Activity} from '../../../../../model/Activity';
import {PopupService} from '../../../../../service/popup.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
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

  constructor(private popupService: PopupService) {
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
}
