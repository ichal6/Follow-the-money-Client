import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AccountsFormAddComponent} from './accounts-form-add.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {AccountType} from '../../../../model/Account';

describe('AccountFormAddComponent', () => {
  let component: AccountsFormAddComponent;
  let fixture: ComponentFixture<AccountsFormAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsFormAddComponent ],
      imports: [
        HttpClientModule, RouterTestingModule, FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsFormAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should true for correct type LOAN', () => {
    component.newAccount.accountType = AccountType.LOAN;
    component.checkIfTypeIsValid();
    expect(component.isTypeValid).toEqual(true);
  });

  it('should true for correct type CASH', () => {
    component.newAccount.accountType = AccountType.CASH;
    component.checkIfTypeIsValid();
    expect(component.isTypeValid).toEqual(true);
  });

  it('should true for correct type BANK', () => {
    component.newAccount.accountType = AccountType.BANK;
    component.checkIfTypeIsValid();
    expect(component.isTypeValid).toEqual(true);
  });
});
