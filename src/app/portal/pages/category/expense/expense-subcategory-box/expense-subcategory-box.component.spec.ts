import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseSubcategoryBoxComponent } from './expense-subcategory-box.component';

describe('ExpenseSubcategoryBoxComponent', () => {
  let component: ExpenseSubcategoryBoxComponent;
  let fixture: ComponentFixture<ExpenseSubcategoryBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseSubcategoryBoxComponent ]
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
