import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccountsPopularComponent } from './accounts-popular.component';

describe('AccountsPopularComponent', () => {
  let component: AccountsPopularComponent;
  let fixture: ComponentFixture<AccountsPopularComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsPopularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsPopularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
