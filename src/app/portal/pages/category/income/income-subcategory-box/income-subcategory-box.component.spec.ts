import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IncomeSubcategoryBoxComponent } from './income-subcategory-box.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';

describe('IncomeSubcategoryBoxComponent', () => {
  let component: IncomeSubcategoryBoxComponent;
  let fixture: ComponentFixture<IncomeSubcategoryBoxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeSubcategoryBoxComponent ],
      imports: [
        HttpClientModule, RouterTestingModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeSubcategoryBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
