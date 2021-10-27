import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SingleBoxPayeeComponent } from './single-box-payee.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {Payee} from '../../../../model/Payee';

describe('SingleBoxPayeeComponent', () => {
  let component: SingleBoxPayeeComponent;
  let fixture: ComponentFixture<SingleBoxPayeeComponent>;

  TestBed.configureTestingModule({
      imports: [
        HttpClientModule, RouterTestingModule
      ],
    });

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule, RouterTestingModule
      ],
      declarations: [ SingleBoxPayeeComponent ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleBoxPayeeComponent);
    component = fixture.componentInstance;

    const expectedPayee = new Payee();
    expectedPayee.name = 'NewPayee';
    component.payee = expectedPayee;
    fixture.detectChanges(); // trigger initial data binding

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
