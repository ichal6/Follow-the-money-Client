import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddPayeeComponent } from './add-payee.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';

describe('AddPayeeComponent', () => {
  let component: AddPayeeComponent;
  let fixture: ComponentFixture<AddPayeeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPayeeComponent ],
      imports: [
        HttpClientTestingModule, RouterTestingModule, FormsModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPayeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
