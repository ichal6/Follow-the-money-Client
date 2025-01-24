import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PaymentsAllComponent } from './payments-all.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule} from '@angular/forms';
import {DataService} from '../../../../service/data.service';
import {getBuyCarPayment, getBuyAnotherCarPayment, getCashDepositSeptember} from '../../../../service/fixture/PaymentModelFixture';

describe('PaymentsAllComponent', () => {
  let component: PaymentsAllComponent;
  let fixture: ComponentFixture<PaymentsAllComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule, RouterTestingModule, HttpClientTestingModule, FormsModule
      ],
    });
    TestBed.configureTestingModule({
      declarations: [PaymentsAllComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    spyOn(DataService.prototype, "getEmail").and.returnValue("fake@no.com");

    fixture = TestBed.createComponent(PaymentsAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter payments by title based on search phrase', () => {
    component.allPayments = [
      getBuyCarPayment(),
      getBuyAnotherCarPayment(),
      getCashDepositSeptember()
    ];

    const searchEvent = {
      target: {value: 'buy car'}
    } as unknown as Event;

    component.filterResult(searchEvent);

    expect(component.displayPayments.length).toBe(2);
    expect(component.displayPayments[0].title).toBe('buy car');
    expect(component.displayPayments[1].title).toBe('buy another car');
  });
});
