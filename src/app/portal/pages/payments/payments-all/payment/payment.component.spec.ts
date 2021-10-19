import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PaymentComponent } from './payment.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {Payment} from '../../../../../model/Payment';

describe('PaymentComponent', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentComponent ],
      imports: [
        HttpClientTestingModule, RouterTestingModule, FormsModule
      ],
      providers: [
        Payment
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentComponent);
    component = fixture.componentInstance;

    const expectedPayment = new Payment();
    expectedPayment.date = new Date(2021, 10, 10);
    component.payment = expectedPayment;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
