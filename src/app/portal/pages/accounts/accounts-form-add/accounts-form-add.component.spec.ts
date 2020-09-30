import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountFormAddComponent } from './accounts-form-add.component';

describe('AccountFormAddComponent', () => {
  let component: AccountFormAddComponent;
  let fixture: ComponentFixture<AccountFormAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountFormAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountFormAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
