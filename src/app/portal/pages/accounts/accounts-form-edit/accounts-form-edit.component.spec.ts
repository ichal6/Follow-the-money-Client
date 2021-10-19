import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AccountsFormEditComponent} from './accounts-form-edit.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {Account, AccountType} from '../../../../model/Account';

describe('AccountsFormEditComponent', () => {
  let component: AccountsFormEditComponent;
  let fixture: ComponentFixture<AccountsFormEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsFormEditComponent ],
      imports: [
        HttpClientTestingModule, RouterTestingModule, FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsFormEditComponent);
    component = fixture.componentInstance;

    const expectedAccount = new Account();
    expectedAccount.accountType = AccountType.CASH;
    component.updatedAccount = expectedAccount;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
