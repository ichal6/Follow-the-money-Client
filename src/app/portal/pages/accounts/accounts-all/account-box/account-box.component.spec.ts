import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccountBoxComponent } from './account-box.component';

describe('AccountBoxComponent', () => {
  let component: AccountBoxComponent;
  let fixture: ComponentFixture<AccountBoxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountBoxComponent ]
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
