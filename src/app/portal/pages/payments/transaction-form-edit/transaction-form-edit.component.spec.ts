import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionFormEditComponent } from './transaction-form-edit.component';
import {FormsModule} from '@angular/forms';
import {FormChangeService} from '../../../../service/form-change.service';
import {Payment} from '../../../../model/Payment';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('TransactionFormEditComponent', () => {
  let component: TransactionFormEditComponent;
  let fixture: ComponentFixture<TransactionFormEditComponent>;
  let formChangeServiceMock: jasmine.SpyObj<FormChangeService>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpClientTestingModule ], // <-- here
      declarations: [TransactionFormEditComponent],
      providers: [
        { provide: FormChangeService, useValue: formChangeServiceMock }
      ]
    });

    const transaction = new Payment();
    transaction.id = 1;

    formChangeServiceMock = jasmine.createSpyObj('FormChangeService', ['transaction']);
    formChangeServiceMock.transaction = transaction;

    fixture = TestBed.createComponent(TransactionFormEditComponent);
    component = fixture.componentInstance;
    component.formChangeService = formChangeServiceMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
