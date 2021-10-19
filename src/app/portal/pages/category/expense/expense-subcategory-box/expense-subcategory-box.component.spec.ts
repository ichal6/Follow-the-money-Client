import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExpenseSubcategoryBoxComponent } from './expense-subcategory-box.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';

describe('ExpenseSubcategoryBoxComponent', () => {
  let component: ExpenseSubcategoryBoxComponent;
  let fixture: ComponentFixture<ExpenseSubcategoryBoxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseSubcategoryBoxComponent ],
      imports: [
        HttpClientModule, RouterTestingModule, FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseSubcategoryBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
