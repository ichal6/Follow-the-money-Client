import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExpenseBoxComponent } from './expense-box.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';

describe('ExpenseBoxComponent', () => {
  let component: ExpenseBoxComponent;
  let fixture: ComponentFixture<ExpenseBoxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseBoxComponent ],
      imports: [
        HttpClientModule, RouterTestingModule, FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
