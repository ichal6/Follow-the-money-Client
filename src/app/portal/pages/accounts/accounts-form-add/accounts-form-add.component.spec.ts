import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsFormAddComponent } from './accounts-form-add.component';

describe('AccountFormAddComponent', () => {
  let component: AccountsFormAddComponent;
  let fixture: ComponentFixture<AccountsFormAddComponent>;

  beforeEach(async(() => {
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
