import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AccountBoxComponent} from './account-box.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {Account, AccountType} from '../../../../../model/Account';

describe('AccountBoxComponent', () => {
  let component: AccountBoxComponent;
  let fixture: ComponentFixture<AccountBoxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountBoxComponent ],
      imports: [
        HttpClientModule, RouterTestingModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountBoxComponent);
    component = fixture.componentInstance;

    const expectedAccount = new Account();
    expectedAccount.accountType = AccountType.BANK;
    expectedAccount.currentBalance = 0.0;
    component.account = expectedAccount;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
