import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentTypeSelectComponent } from './payment-type-select.component';

describe('PaymentTypeSelectComponent', () => {
  let component: PaymentTypeSelectComponent;
  let fixture: ComponentFixture<PaymentTypeSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentTypeSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentTypeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
