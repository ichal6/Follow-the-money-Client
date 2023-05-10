import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayeeAllComponent } from './payee-all.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';

describe('PayeeAllComponent', () => {
  let component: PayeeAllComponent;
  let fixture: ComponentFixture<PayeeAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayeeAllComponent ],
      imports: [
        HttpClientModule, RouterTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayeeAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
