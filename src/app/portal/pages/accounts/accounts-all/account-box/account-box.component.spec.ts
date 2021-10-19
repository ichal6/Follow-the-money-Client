import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccountBoxComponent } from './account-box.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';

describe('AccountBoxComponent', () => {
  let component: AccountBoxComponent;
  let fixture: ComponentFixture<AccountBoxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountBoxComponent ],
      imports: [
        HttpClientModule, RouterTestingModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
