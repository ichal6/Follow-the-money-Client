import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TransactionFormAddComponent } from './transaction-form-add.component';

describe('TransactionFormAddComponent', () => {
  let component: TransactionFormAddComponent;
  let fixture: ComponentFixture<TransactionFormAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionFormAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionFormAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
