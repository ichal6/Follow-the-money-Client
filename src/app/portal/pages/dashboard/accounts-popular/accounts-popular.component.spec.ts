import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {AccountsPopularComponent} from './accounts-popular.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {Account, AccountType} from '../../../../model/Account';
import {Dashboard} from '../../../../model/Dashboard';

describe('AccountsPopularComponent', () => {
  let component: AccountsPopularComponent;
  let fixture: ComponentFixture<AccountsPopularComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsPopularComponent ],
      imports: [
        HttpClientTestingModule, RouterTestingModule, FormsModule
      ],
      providers: [
        Dashboard, Account
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsPopularComponent);
    component = fixture.componentInstance;

    const expectedAccount = new Account();
    expectedAccount.accountType = AccountType.BANK;
    const expectedDashboard = new Dashboard();
    expectedDashboard.popularAccounts = new Array<Account>(expectedAccount);
    component.dashboard = TestBed.inject(Dashboard);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
