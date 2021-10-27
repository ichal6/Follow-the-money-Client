import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {LoginFormComponent} from './login-form.component';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../../../service/auth.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginFormComponent],
      imports: [
        HttpClientTestingModule, RouterTestingModule, FormsModule
      ],
      providers: [
        AuthService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
