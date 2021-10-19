import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegisterTextComponent } from './register-text.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';

describe('RegisterTextComponent', () => {
  let component: RegisterTextComponent;
  let fixture: ComponentFixture<RegisterTextComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterTextComponent ],
      imports: [
        HttpClientTestingModule, RouterTestingModule, FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
