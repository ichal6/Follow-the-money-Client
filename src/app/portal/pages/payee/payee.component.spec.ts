import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PayeeComponent } from './payee.component';

describe('PayeeComponent', () => {
  let component: PayeeComponent;
  let fixture: ComponentFixture<PayeeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PayeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
