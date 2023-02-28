import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialTableComponent } from './financial-table.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('FinancialTableComponent', () => {
  let component: FinancialTableComponent;
  let fixture: ComponentFixture<FinancialTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancialTableComponent ],
      imports: [
        HttpClientTestingModule
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
