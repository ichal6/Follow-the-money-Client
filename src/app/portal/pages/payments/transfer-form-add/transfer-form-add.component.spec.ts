import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TransferFormAddComponent } from './transfer-form-add.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';

describe('TransferFormAddComponent', () => {
  let component: TransferFormAddComponent;
  let fixture: ComponentFixture<TransferFormAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferFormAddComponent ],
      imports: [
        HttpClientTestingModule, RouterTestingModule, FormsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferFormAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
