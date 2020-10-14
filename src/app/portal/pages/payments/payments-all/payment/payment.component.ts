import {Component, Input, OnInit} from '@angular/core';
import {Payment} from '../../../../../model/Payment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  @Input()
  public payment: Payment;

  constructor() { }

  ngOnInit(): void {
  }

}
