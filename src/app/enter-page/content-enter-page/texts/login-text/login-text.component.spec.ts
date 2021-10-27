import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoginTextComponent } from './login-text.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('LoginTextComponent', () => {
  let component: LoginTextComponent;
  let fixture: ComponentFixture<LoginTextComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginTextComponent ],
      imports: [
        HttpClientTestingModule, RouterTestingModule
      ],
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
