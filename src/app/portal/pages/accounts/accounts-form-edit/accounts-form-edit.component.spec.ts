import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {By} from "@angular/platform-browser";
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';

import {AccountsFormEditComponent} from './accounts-form-edit.component';
import {getMillenniumAccount} from "../../../../service/fixture/AccountModelFixture";

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

    component.updatedAccount = getMillenniumAccount();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('after initialize edit account form name should be correct assign', waitForAsync(() => {
    expect(component.updatedAccountForm.name).toEqual(component.updatedAccount.name);
    expect(component.updatedAccountForm.id).toEqual(component.updatedAccount.id);
    expect(component.updatedAccountForm.startingBalance).toEqual(component.updatedAccount.startingBalance);

    fixture.whenStable().then(() => {
        const name = fixture.debugElement.query(By.css("#name")).nativeElement.value;
        expect(name).toEqual(component.updatedAccount.name);
      }
    );
  }))
});
