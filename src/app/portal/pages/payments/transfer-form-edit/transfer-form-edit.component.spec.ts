import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferFormEditComponent } from './transfer-form-edit.component';
import {FormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormChangeService} from '../../../../service/form-change.service';
import {Payment} from '../../../../model/Payment';
import {spyDataServiceGetEmail} from '../../../../service/common/SpyObjects';
import {Transfer} from '../../../../model/Transfer';
import {By} from '@angular/platform-browser';
import {Observable, Observer} from "rxjs";
import {TransferService} from "../../../../service/transfer.service";

describe('TransferFormEditComponent', () => {
  let component: TransferFormEditComponent;
  let fixture: ComponentFixture<TransferFormEditComponent>;
  let formChangeServiceMock: jasmine.SpyObj<FormChangeService>;
  let transferServiceMock: jasmine.SpyObj<TransferService>;
  const getTime = Date.prototype.getTime;
  const getTimezoneOffset = Date.prototype.getTimezoneOffset;

  beforeEach(() => {
    // initialize object
    const payment = new Payment();
    payment.id = 1;
    const transfer = new Transfer();

    // Spy payment object
    formChangeServiceMock = jasmine.createSpyObj('FormChangeService', ['payment']);
    formChangeServiceMock.payment = payment;

    // Spy Transfer object
    transferServiceMock = jasmine.createSpyObj('TransferService',
      ['getTransfer', 'updateTransfer']);
    transferServiceMock.getTransfer.and.callFake(() => {
      return new Observable<Transfer>((observer: Observer<Transfer>) => {
        observer.next(transfer);
      });
    });

    transferServiceMock.updateTransfer.and.callFake(() => {
      return new Observable<void>((observer: Observer<void>) => {
        observer.next();
      });
    });

    spyDataServiceGetEmail();

    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpClientTestingModule ],
      declarations: [TransferFormEditComponent],
      providers: [
        { provide: FormChangeService, useValue: formChangeServiceMock },
        { provide: TransferService, useValue: transferServiceMock }
      ]
    });

    // Fixture Clock
    const timestamp = 1699976646000;
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date(timestamp)); // 14 nov 2023 15:44:06 UTC
    Date.prototype.getTimezoneOffset =  () => -60; // Time zone for Warsaw
    Date.prototype.getTime = () => timestamp;

    fixture = TestBed.createComponent(TransferFormEditComponent);
    component = fixture.componentInstance;
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

  it('should transfer be instance of Transfer class', () => {
    expect(component.updateTransfer).toBeInstanceOf(Transfer);
  });

  it('should button is disabled for the same account choose', () => {
    const transfer = component.updateTransfer;

    transfer.title = 'example';
    transfer.date = '2023-08-09T14:27';
    transfer.value = 123;
    transfer.accountIdTo = 1;
    transfer.accountIdFrom = 1;
    fixture.detectChanges();

    const buttonStatus = fixture.debugElement.query(By.css('#submit'));
    expect(buttonStatus.nativeElement.disabled).toBeTruthy();
  });

  it('should button is enable for correct fields', () => {
    const transfer = component.updateTransfer;

    transfer.title = 'example';
    transfer.date = '2023-08-09T14:27:00';
    transfer.value = 123;
    transfer.accountIdTo = 1;
    transfer.accountIdFrom = 2;
    fixture.detectChanges();

    const buttonStatus = fixture.debugElement.query(By.css('#submit'));
    expect(buttonStatus.nativeElement.disabled).toBeFalsy();
  });

  it('should transfer date is as a localtime for Warsaw', () => {
    expect(component.updateTransfer.date).toBe('2023-11-14T16:44:06');
  });

  it('should change date to UTC when click update', () => {
    // given
    spyOn(TransferService.prototype, "updateTransfer")
      .and.returnValue(new Observable());

    transferServiceMock.updateTransfer.and.callFake(() => {
      return new Observable<void>();
    });
    // when
    component.onSubmit();
    // then
    expect(component.updateTransfer.date).toBe('2023-11-14T15:44:06');
  });

  it('should change date to LocalDateTime when click update and server throw an error', () => {
    // given
    transferServiceMock.updateTransfer.and.callFake(() => {
      return new Observable<void>((observer: Observer<void>) => {
        observer.error(new Error('Server is down'));
      });
    });
    // when
    component.onSubmit();
    // then
    expect(component.updateTransfer.date).toBe('2023-11-14T16:44:06');
  });

  it('should display error message when click update and server throws an error', () => {
    // given
    const error = new Error('Server is down');
    transferServiceMock.updateTransfer.and.callFake(() => {
      return new Observable<void>((observer: Observer<void>) => {
        observer.error(error);
      });
    });
    // when
    component.onSubmit();
    // then
    expect(component.message).toBe(error.message);
  });
});
