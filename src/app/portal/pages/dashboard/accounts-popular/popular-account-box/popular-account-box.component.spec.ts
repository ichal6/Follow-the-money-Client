import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {PopularAccountBoxComponent} from './popular-account-box.component';
import {Account, AccountType} from '../../../../../model/Account';

describe('PopularAccountBoxComponent', () => {
  let component: PopularAccountBoxComponent;
  let fixture: ComponentFixture<PopularAccountBoxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularAccountBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularAccountBoxComponent);
    component = fixture.componentInstance;

    const expectedAccount = new Account();
    expectedAccount.accountType = AccountType.BANK;
    component.account = expectedAccount;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select correct icon for loan account', () => {
    // given
    component.account.accountType = AccountType.LOAN;
    // when
    const urlToIcon = component.urlToImage();
    // then
    expect(urlToIcon).toEqual('loan-type.png');
  });

  it('should select correct icon for cash account', () => {
    // given
    component.account.accountType = AccountType.CASH;
    // when
    const urlToIcon = component.urlToImage();
    // then
    expect(urlToIcon).toEqual('wallet-type.png');
  });

  it('should select correct icon for bank account', () => {
    // given
    component.account.accountType = AccountType.BANK;
    // when
    const urlToIcon = component.urlToImage();
    // then
    expect(urlToIcon).toEqual('bank-type.png');
  });
});
