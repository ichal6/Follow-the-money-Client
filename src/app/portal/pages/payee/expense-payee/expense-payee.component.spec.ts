import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExpensePayeeComponent } from './expense-payee.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';

describe('ExpensePayeeComponent', () => {
  let component: ExpensePayeeComponent;
  let fixture: ComponentFixture<ExpensePayeeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensePayeeComponent ],
      imports: [
        HttpClientModule, RouterTestingModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensePayeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
