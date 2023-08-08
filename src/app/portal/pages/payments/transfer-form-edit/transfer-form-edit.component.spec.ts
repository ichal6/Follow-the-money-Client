import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferFormEditComponent } from './transfer-form-edit.component';
import {FormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TransactionFormEditComponent} from '../transaction-form-edit/transaction-form-edit.component';
import {FormChangeService} from '../../../../service/form-change.service';
import {TransactionsService} from '../../../../service/transactions.service';
import {TransferService} from '../../../../service/transfer.service';
import {Payment} from '../../../../model/Payment';
import {Transaction} from '../../../../model/Transaction';
import {Observable, Observer} from 'rxjs';
import {spyDataServiceGetEmail} from '../../../../service/common/SpyObjects';

describe('TransferFormEditComponent', () => {
  let component: TransferFormEditComponent;
  let fixture: ComponentFixture<TransferFormEditComponent>;
  let formChangeServiceMock: jasmine.SpyObj<FormChangeService>;

  beforeEach(() => {
    // initialize object
    const payment = new Payment();
    payment.id = 1;

    // Spy payment object
    formChangeServiceMock = jasmine.createSpyObj('FormChangeService', ['payment']);
    formChangeServiceMock.payment = payment;

    spyDataServiceGetEmail();

    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpClientTestingModule ],
      declarations: [TransferFormEditComponent],
      providers: [
        { provide: FormChangeService, useValue: formChangeServiceMock }
      ]
    });

    fixture = TestBed.createComponent(TransferFormEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
