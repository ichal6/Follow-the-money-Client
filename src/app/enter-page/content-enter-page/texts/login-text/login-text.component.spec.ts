import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginTextComponent } from './login-text.component';

describe('LoginTextComponent', () => {
  let component: LoginTextComponent;
  let fixture: ComponentFixture<LoginTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
