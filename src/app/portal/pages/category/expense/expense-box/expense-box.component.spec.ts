import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExpenseBoxComponent } from './expense-box.component';

describe('ExpenseBoxComponent', () => {
  let component: ExpenseBoxComponent;
  let fixture: ComponentFixture<ExpenseBoxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseBoxComponent ]
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
