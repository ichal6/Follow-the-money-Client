import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeSubcategoryBoxComponent } from './income-subcategory-box.component';

describe('IncomeSubcategoryBoxComponent', () => {
  let component: IncomeSubcategoryBoxComponent;
  let fixture: ComponentFixture<IncomeSubcategoryBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeSubcategoryBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeSubcategoryBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
