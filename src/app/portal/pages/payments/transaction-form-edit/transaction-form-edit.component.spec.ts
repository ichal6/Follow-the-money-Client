import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TransactionFormEditComponent} from './transaction-form-edit.component';
import {FormsModule} from '@angular/forms';
import {FormChangeService} from '../../../../service/form-change.service';
import {Payment} from '../../../../model/Payment';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {spyDataServiceGetEmail} from '../../../../service/common/SpyObjects';
import {TransactionService} from '../../../../service/transaction.service';
import {Observable, Observer} from 'rxjs';
import {Transaction} from '../../../../model/Transaction';
import {getBuyCarTransaction, getTaxiWithSubcategory} from "../../../../service/fixture/TransationModelFixture";
import {getTaxi} from "../../../../service/fixture/TransationModelFixture";
import {getTransportCategory} from "../../../../service/fixture/CategoryModelFixture";
import {By} from "@angular/platform-browser";

describe('TransactionFormEditComponent', () => {
  let component: TransactionFormEditComponent;
  let fixture: ComponentFixture<TransactionFormEditComponent>;
  let formChangeServiceMock: jasmine.SpyObj<FormChangeService>;
  let transactionServiceMock: jasmine.SpyObj<TransactionService>;

  const getTime = Date.prototype.getTime;
  const getTimezoneOffset = Date.prototype.getTimezoneOffset;

  beforeEach(() => {
    // initialize object
    const payment = new Payment();
    payment.id = 1;
    const transaction = new Transaction();

    // Spy payment object
    formChangeServiceMock = jasmine.createSpyObj('FormChangeService', ['transaction']);
    formChangeServiceMock.payment = payment;

    // Spy Transaction object
    transactionServiceMock = jasmine.createSpyObj('TransactionsService',
      ['getTransaction', 'updateTransaction']);
    transactionServiceMock.getTransaction.and.callFake(() => {
      return new Observable<Transaction>((observer: Observer<Transaction>) => {
        observer.next(transaction);
      });
    });

    transactionServiceMock.updateTransaction.and.callFake(() => {
      return new Observable<void>((observer: Observer<void>) => {
        observer.next();
      });
    });

    spyDataServiceGetEmail();

    TestBed.configureTestingModule({
        imports: [ FormsModule, HttpClientTestingModule ],
        declarations: [TransactionFormEditComponent],
        providers: [
            { provide: FormChangeService, useValue: formChangeServiceMock },
            { provide: TransactionService, useValue: transactionServiceMock }
        ]
    });

    // Fixture Clock
    const timestamp = 1699976646000;
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date(timestamp)); // 14 nov 2023 15:44:06 UTC
    Date.prototype.getTimezoneOffset =  () => -60; // Time zone for Warsaw
    Date.prototype.getTime = () => timestamp;

    fixture = TestBed.createComponent(TransactionFormEditComponent);
    component = fixture.componentInstance;
    component.formChangeService = formChangeServiceMock;
    fixture.detectChanges();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
    Date.prototype.getTime = getTime;
    Date.prototype.getTimezoneOffset = getTimezoneOffset;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should transaction be instance of Transaction class', () => {
    expect(component.updateTransaction).toBeInstanceOf(Transaction);
  });

  it('should transaction date is as a localtime for Warsaw', () => {
    expect(component.updateTransaction.date).toBe('2023-11-14T16:44:06');
  });

  it('should change date to UTC when click update', () => {
    // given
    spyOn(TransactionService.prototype, "updateTransaction")
      .and.returnValue(new Observable());

    transactionServiceMock.updateTransaction.and.callFake(() => {
      return new Observable<void>();
    });
    // when
    component.onSubmit();
    // then
    expect(component.updateTransaction.date).toBe('2023-11-14T15:44:06');
  });

  it('should change date to LocalDateTime when click update and server throw an error', () => {
    // given
    transactionServiceMock.updateTransaction.and.callFake(() => {
      return new Observable<void>((observer: Observer<void>) => {
        observer.error(new Error('Server is down'));
      });
    });
    // when
    component.onSubmit();
    // then
    expect(component.updateTransaction.date).toBe('2023-11-14T16:44:06');
  });

  it('should display error message when click update and server throws an error', () => {
    // given
    const error = new Error('Server is down');
    transactionServiceMock.updateTransaction.and.callFake(() => {
      return new Observable<void>((observer: Observer<void>) => {
        observer.error(error);
      });
    });
    // when
    component.onSubmit();
    // then
    expect(component.message).toBe(error.message);
  });

  it('should can edit when seconds set to 00', () => {
    // given
    component.updateTransaction = getBuyCarTransaction();
    // when
    fixture.detectChanges();
    // then
    const buttonStatus = fixture.debugElement.query(By.css('#submit'));
    expect(buttonStatus.nativeElement.disabled).toBeFalsy();
  });

  it('should cannot edit for incorrect date', () => {
    // given
    component.updateTransaction = getBuyCarTransaction();
    component.updateTransaction.date = '2023-11-18T25:15:00';
    // when
    fixture.detectChanges();
    // then
    const buttonStatus = fixture.debugElement.query(By.css('#submit'));
    expect(buttonStatus.nativeElement.disabled).toBeTruthy();
  });

  it('should return correct list of subcategories for the category', () => {
    // given
    component.updateTransaction = getTaxi();
    component.allCategories = [getTransportCategory()];
    // when
    const subcategories = component.getSubcategories();
    // then
    expect(subcategories).toEqual(getTransportCategory().subcategories);
  });

  it('should fill dropbox with subcategories', () => {
    // given
    component.updateTransaction = getTaxi();
    component.allCategories = [getTransportCategory()];
    // when
    fixture.detectChanges();
    const options = fixture.debugElement.query(By.css("#subcategory")).nativeElement.options;
    // then
    expect(options.length).toEqual(2);
    expect(options[0].label).toEqual('None');
    expect(options[1].label).toEqual('Taxi');
  });

  it('should set subcategoryId to null for updateTransaction when user change category', () => {
    // given
    component.updateTransaction = getTaxiWithSubcategory();
    const select: HTMLSelectElement = fixture.debugElement.query(By.css('#category')).nativeElement;

    // when
    select.dispatchEvent(new Event('change'));

    // then
    expect(component.updateTransaction.subcategoryId).toBeNull();
  });
});
