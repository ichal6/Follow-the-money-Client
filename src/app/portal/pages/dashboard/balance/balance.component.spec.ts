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
    component.dashboard.difference = -454.43999999999994;
    component.dashboard.totalBalance = 12.8999999999994;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('digits should be round to 2 decimal in difference', () => {
    // when
    const pDifference = fixture.nativeElement.querySelector('#difference').textContent;
    const differenceSplit = pDifference.split(' ');
    const differenceValueExpected = +differenceSplit[1];
    // then
    expect(differenceValueExpected).toEqual(-454.44);
  });

  it('digits should be round to 2 decimal in totalBalance', () => {
    // when
    const pDifference = fixture.nativeElement.querySelector('#currency').textContent;
    const differenceSplit = pDifference.slice(1, -3);

    // then
    expect(differenceSplit).toEqual(12.90);
  });
});
