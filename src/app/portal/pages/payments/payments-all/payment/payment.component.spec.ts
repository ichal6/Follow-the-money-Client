import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {PaymentComponent} from './payment.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {Payment} from '../../../../../model/Payment';
import {getBuyAnotherCarPayment, getBuyCarPayment} from '../../../../../service/fixture/PaymentModelFixture';

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

  it('should display subcategory if Payment has subcategory field', () => {
    // arrange
    const payment = getBuyCarPayment();
    component.payment = payment;
    component.isFullLength = true;
    fixture.detectChanges();

    // act
    const debugElement = fixture.debugElement.query(
      debugEl => debugEl.name === 'p'
        && debugEl.nativeElement.textContent.includes(payment.subcategoryName)
    );

    // assert
    expect(debugElement).toBeTruthy();
    expect(debugElement.nativeElement.textContent.includes('Subcategory: ' + payment.subcategoryName));
  });


  it('should not display subcategory if Payment has not subcategory field', () => {
    // arrange
    component.payment = getBuyAnotherCarPayment();
    component.isFullLength = true;
    fixture.detectChanges();

    // act
    const debugElement = fixture.debugElement.query(
      debugEl => debugEl.name === 'p'
        && debugEl.nativeElement.textContent.includes('Subcategory')
    );

    // assert
    expect(debugElement).toBeNull();
  });
});
