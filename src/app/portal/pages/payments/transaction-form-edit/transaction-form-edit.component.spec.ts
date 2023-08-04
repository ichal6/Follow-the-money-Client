import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TransactionFormEditComponent} from './transaction-form-edit.component';
import {FormsModule} from '@angular/forms';
import {FormChangeService} from '../../../../service/form-change.service';
import {Payment} from '../../../../model/Payment';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {spyDataServiceGetEmail} from '../../../../service/common/SpyObjects';
import {TransactionsService} from '../../../../service/transactions.service';
import {Observable, Observer} from 'rxjs';
import {Transaction} from '../../../../model/Transaction';


describe('TransactionFormEditComponent', () => {
  let component: TransactionFormEditComponent;
  let fixture: ComponentFixture<TransactionFormEditComponent>;
  let formChangeServiceMock: jasmine.SpyObj<FormChangeService>;
  let transactionServiceMock: jasmine.SpyObj<TransactionsService>;


  beforeEach(() => {
    // initialize object
    const payment = new Payment();
    payment.id = 1;
    const transaction = new Transaction();

    // Spy payment object
    formChangeServiceMock = jasmine.createSpyObj('FormChangeService', ['transaction']);
    formChangeServiceMock.transaction = payment;

    // Spy Transaction object
    transactionServiceMock = jasmine.createSpyObj('TransactionsService', ['getTransaction']);
    transactionServiceMock.getTransaction.and.callFake(() => {
      return new Observable<Transaction>((observer: Observer<Transaction>) => {
        observer.next(transaction);
      });
    });

    spyDataServiceGetEmail();

    TestBed.configureTestingModule({
        imports: [ FormsModule, HttpClientTestingModule ],
        declarations: [TransactionFormEditComponent],
        providers: [
            { provide: FormChangeService, useValue: formChangeServiceMock },
            { provide: TransactionsService, useValue: transactionServiceMock }
        ]
    });

    fixture = TestBed.createComponent(TransactionFormEditComponent);
    component = fixture.componentInstance;
    component.formChangeService = formChangeServiceMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should transaction be instance of Transaction class', () => {
    expect(component.updateTransaction).toBeInstanceOf(Transaction);
  });
});
