import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PaymentsAllComponent } from './payments-all.component';

describe('PaymentsAllComponent', () => {
  let component: PaymentsAllComponent;
  let fixture: ComponentFixture<PaymentsAllComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentsAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
