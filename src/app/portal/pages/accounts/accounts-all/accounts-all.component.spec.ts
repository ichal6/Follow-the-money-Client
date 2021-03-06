import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccountsAllComponent } from './accounts-all.component';

describe('AccountsAllComponent', () => {
  let component: AccountsAllComponent;
  let fixture: ComponentFixture<AccountsAllComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
