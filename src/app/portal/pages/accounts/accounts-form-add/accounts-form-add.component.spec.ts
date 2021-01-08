import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccountsFormAddComponent } from './accounts-form-add.component';

describe('AccountFormAddComponent', () => {
  let component: AccountsFormAddComponent;
  let fixture: ComponentFixture<AccountsFormAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsFormAddComponent ]
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
});
