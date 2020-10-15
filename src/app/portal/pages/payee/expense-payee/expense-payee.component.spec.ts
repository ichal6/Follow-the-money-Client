import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensePayeeComponent } from './expense-payee.component';

describe('ExpensePayeeComponent', () => {
  let component: ExpensePayeeComponent;
  let fixture: ComponentFixture<ExpensePayeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensePayeeComponent ]
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
