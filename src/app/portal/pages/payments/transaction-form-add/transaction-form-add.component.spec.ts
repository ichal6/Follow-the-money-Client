import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TransactionFormAddComponent } from './transaction-form-add.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {DataService} from '../../../../service/data.service';

describe('TransactionFormAddComponent', () => {
  let component: TransactionFormAddComponent;
  let fixture: ComponentFixture<TransactionFormAddComponent>;

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
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
