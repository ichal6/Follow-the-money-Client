import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {TransactionFormAddComponent} from './transaction-form-add.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {DataService} from '../../../../service/data.service';
import {TransactionService} from "../../../../service/transaction.service";
import {Observable, throwError} from "rxjs";

describe('TransactionFormAddComponent', () => {
  let component: TransactionFormAddComponent;
  let fixture: ComponentFixture<TransactionFormAddComponent>;
  const getTime = Date.prototype.getTime;
  const getTimezoneOffset = Date.prototype.getTimezoneOffset;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionFormAddComponent ],
      imports: [
        HttpClientTestingModule, RouterTestingModule, FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    spyOn(DataService.prototype, "getEmail").and.returnValue("fake@no.com");

    fixture = TestBed.createComponent(TransactionFormAddComponent);

    const timestamp = 1699976646000; // 14 nov 2023 15:44:06 UTC
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date(timestamp));
    Date.prototype.getTimezoneOffset =  () => -60; // Time zone for Warsaw
    Date.prototype.getTime = () => timestamp;

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
    Date.prototype.getTime = getTime;
    Date.prototype.getTimezoneOffset = getTimezoneOffset;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should transaction date is in a localtime for Warsaw', () => {
    expect(component.newTransaction.date).toBe('2023-11-14T16:44:06');
  });

  it('should change date to UTC when click save', () => {
    // given
    spyOn(TransactionService.prototype, "addTransaction")
      .and.returnValue(new Observable());
    // when
    component.onSubmit();
    // then
    expect(component.newTransaction.date).toBe('2023-11-14T15:44:06');
  });

  it('should change date to LocalDateTime when click save and server throw an error', () => {
    // given
    spyOn(TransactionService.prototype, "addTransaction")
      .and.returnValue(throwError(() => new Error('server is down')));
    // when
    component.onSubmit();
    // then
    expect(component.newTransaction.date).toBe('2023-11-14T16:44:06');
  });

  it('should display error message when click save and server throws an error', () => {
    // given
    const error = new Error('Server is down');
    spyOn(TransactionService.prototype, "addTransaction")
      .and.returnValue(throwError(() => error));
    // when
    component.onSubmit();
    // then
    expect(component.message).toBe(error.message);
  });
});
