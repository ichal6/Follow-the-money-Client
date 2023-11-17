import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferFormEditComponent } from './transfer-form-edit.component';
import {FormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormChangeService} from '../../../../service/form-change.service';
import {Payment} from '../../../../model/Payment';
import {spyDataServiceGetEmail} from '../../../../service/common/SpyObjects';
import {Transfer} from '../../../../model/Transfer';
import {By} from '@angular/platform-browser';

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
});
