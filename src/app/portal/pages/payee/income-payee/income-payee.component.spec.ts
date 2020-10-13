import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomePayeeComponent } from './income-payee.component';

describe('IncomePayeeComponent', () => {
  let component: IncomePayeeComponent;
  let fixture: ComponentFixture<IncomePayeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomePayeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomePayeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
