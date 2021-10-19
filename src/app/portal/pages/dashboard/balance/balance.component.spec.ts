import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BalanceComponent } from './balance.component';
import {Dashboard} from '../../../../model/Dashboard';

describe('BalanceComponent', () => {
  let component: BalanceComponent;
  let fixture: ComponentFixture<BalanceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceComponent ],
      providers: [
        Dashboard
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceComponent);
    component = fixture.componentInstance;
    component.dashboard = TestBed.inject(Dashboard);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
