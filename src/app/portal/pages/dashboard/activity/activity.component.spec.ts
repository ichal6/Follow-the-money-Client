import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ActivityComponent } from './activity.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {Dashboard} from '../../../../model/Dashboard';

describe('ActivityComponent', () => {
  let component: ActivityComponent;
  let fixture: ComponentFixture<ActivityComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityComponent ],
      imports: [
        HttpClientModule, RouterTestingModule, FormsModule
      ],
      providers: [
        Dashboard
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityComponent);
    component = fixture.componentInstance;
    component.dashboard = TestBed.inject(Dashboard);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
