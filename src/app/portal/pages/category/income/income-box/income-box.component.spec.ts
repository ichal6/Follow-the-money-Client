import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IncomeBoxComponent } from './income-box.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';

describe('IncomeBoxComponent', () => {
  let component: IncomeBoxComponent;
  let fixture: ComponentFixture<IncomeBoxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeBoxComponent ],
      imports: [
        HttpClientModule, RouterTestingModule, FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
