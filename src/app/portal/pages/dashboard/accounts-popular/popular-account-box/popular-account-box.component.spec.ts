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
});
