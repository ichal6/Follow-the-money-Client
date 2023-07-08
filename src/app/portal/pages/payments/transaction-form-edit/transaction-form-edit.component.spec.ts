import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionFormEditComponent } from './transaction-form-edit.component';

describe('TransactionFormEditComponent', () => {
  let component: TransactionFormEditComponent;
  let fixture: ComponentFixture<TransactionFormEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionFormEditComponent]
    });
    fixture = TestBed.createComponent(TransactionFormEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
