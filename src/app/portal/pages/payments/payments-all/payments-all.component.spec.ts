import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule} from '@angular/forms';

import {DataService} from '../../../../service/data.service';
import { PaymentsAllComponent } from './payments-all.component';
import {getBuyCarPayment, getBuyAnotherCarPayment, getCashDepositSeptember} from '../../../../service/fixture/PaymentModelFixture';

describe('PaymentsAllComponent', () => {
  let component: PaymentsAllComponent;
  let fixture: ComponentFixture<PaymentsAllComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule, RouterTestingModule, HttpClientTestingModule, FormsModule
      ],
    });
    TestBed.configureTestingModule({
      declarations: [PaymentsAllComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    // Given
    spyOn(DataService.prototype, "getEmail").and.returnValue("fake@no.com");

    fixture = TestBed.createComponent(PaymentsAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    // Given
    component.allPayments = [
      getBuyCarPayment(),
      getBuyAnotherCarPayment(),
      getCashDepositSeptember()
    ];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter payments by title based on search phrase', () => {
    // Given
    const searchEvent = {
      target: {value: 'buy car'}
    } as unknown as Event;

    // When
    component.filterResult(searchEvent);

    // Then
    expect(component.displayPayments.length).toBe(2);
    expect(component.displayPayments[0].title).toBe('buy car');
    expect(component.displayPayments[1].title).toBe('buy another car');
  });

  it('should filter payments by from name based on search phrase', () => {
    // Given
    const searchEvent = {
      target: {value: 'Savings in sock'}
    } as unknown as Event;

    // When
    component.filterResult(searchEvent);

    // Then
    expect(component.displayPayments.length).toBe(2);
    expect(component.displayPayments[0].from).toBe('Savings in sock');
    expect(component.displayPayments[1].from).toBe('Savings in sock');
  });

  it('should filter payments by to name based on search phrase', () => {
    // Given
    const searchEvent = {
      target: {value: 'MERCEDES-BENZ Poland'}
    } as unknown as Event;

    // When
    component.filterResult(searchEvent);

    // Then
    expect(component.displayPayments.length).toBe(2);
    expect(component.displayPayments[0].to).toBe('MERCEDES-BENZ Poland');
    expect(component.displayPayments[1].to).toBe('MERCEDES-BENZ Poland');
  });

  it('should filter payments by categoryName name based on search phrase', () => {
    // Given
    const categoryName = getBuyCarPayment().categoryName;

    const searchEvent = {
      target: {value: categoryName}
    } as unknown as Event;

    // When
    component.filterResult(searchEvent);

    // Then
    expect(component.displayPayments.length).toBe(2);
    expect(component.displayPayments[0].categoryName).toBe(categoryName);
    expect(component.displayPayments[1].categoryName).toBe(categoryName);
  });

  it('should filter payments by subcategoryName name based on search phrase', () => {
    // Given
    const subcategoryName = getBuyCarPayment().subcategoryName;

    const searchEvent = {
      target: {value: subcategoryName}
    } as unknown as Event;

    // When
    component.filterResult(searchEvent);

    // Then
    expect(component.displayPayments.length).toBe(1);
    expect(component.displayPayments[0].subcategoryName).toBe(subcategoryName);
  });

  it('should filter by European date format (DD.MM.YYYY)', () => {
    // Given
    const searchEvent = {
      target: {value: '01.05.2022'}
    } as unknown as Event;

    // When
    component.filterResult(searchEvent);

    // Then
    expect(component.displayPayments.length).toBe(1);
    expect(component.displayPayments[0].date).toEqual(getBuyCarPayment().date);
  });

  it('should filter by partial European date (DD.MM)', () => {
    // Given
    const searchEvent = {
      target: {value: '01.05'}
    } as unknown as Event;

    // When
    component.filterResult(searchEvent);

    // Then
    expect(component.displayPayments.length).toBe(1);
    expect(component.displayPayments[0].date).toEqual(getBuyCarPayment().date);
  });

  it('should filter by single digit date format (D.M.YYYY)', () => {
    // Given
    const searchEvent = {
      target: {value: '1.5.2022'}
    } as unknown as Event;

    // When
    component.filterResult(searchEvent);

    // Then
    expect(component.displayPayments.length).toBe(1);
    expect(component.displayPayments[0].date).toEqual(getBuyCarPayment().date);
  });

  it('should filter by year only', () => {
    // Given
    const searchEvent = {
      target: {value: '2022'}
    } as unknown as Event;

    // When
    component.filterResult(searchEvent);

    // Then
    expect(component.displayPayments.length).toBe(3);
  });

  it('should filter by year and month (YYYY-MM)', () => {
    // Given
    const searchEvent = {
      target: {value: '2022-09'}
    } as unknown as Event;

    // When
    component.filterResult(searchEvent);

    // Then
    expect(component.displayPayments.length).toBe(1);
    expect(component.displayPayments[0].date).toEqual(getCashDepositSeptember().date);
  });

  it('should handle progressive date input (YYYY-M)', () => {
    // Given
    const searchEvent = {
      target: {value: '2022-5'}
    } as unknown as Event;

    // When
    component.filterResult(searchEvent);

    // Then
    expect(component.displayPayments.length).toBe(1);
    expect(component.displayPayments[0].date).toEqual(getBuyCarPayment().date);
  });

  it('should combine date and text search', () => {
    // Given
    const searchEvent = {
      target: {value: '2022 car'}
    } as unknown as Event;

    // When
    component.filterResult(searchEvent);

    // Then
    expect(component.displayPayments.length).toBe(2);
    expect(component.displayPayments.map(p => p.title)).toContain('buy car');
    expect(component.displayPayments.map(p => p.title)).toContain('buy another car');
  });

  it('should handle empty search', () => {
    // Given
    const searchEvent = {
      target: {value: ''}
    } as unknown as Event;

    // When
    component.filterResult(searchEvent);

    // Then
    expect(component.displayPayments.length).toBe(3);
  });

  it('should handle whitespace-only search', () => {
    // Given
    const searchEvent = {
      target: {value: '   '}
    } as unknown as Event;

    // When
    component.filterResult(searchEvent);

    // Then
    expect(component.displayPayments.length).toBe(3);
  });

  it('should handle invalid date format gracefully', () => {
    // Given
    const searchEvent = {
      target: {value: 'invalid-date'}
    } as unknown as Event;

    // When
    component.filterResult(searchEvent);

    // Then
    expect(component.displayPayments.length).toBe(0);
  });

  it('should handle case-insensitive search', () => {
    // Given
    const searchEvent = {
      target: {value: 'CAR'}
    } as unknown as Event;

    // When
    component.filterResult(searchEvent);

    // Then
    expect(component.displayPayments.length).toBe(2);
    expect(component.displayPayments.map(p => p.title)).toContain('buy car');
    expect(component.displayPayments.map(p => p.title)).toContain('buy another car');
  });
});
