import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import { throwError, of } from 'rxjs';

import { AddPayeeComponent } from './add-payee.component';

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

  it('should handle error when savePayee fails', () => {
    // Arrange
    const errorResponse = { error: 'Error message' };
    spyOn(component['payeeService'], 'createNewPayee').and.returnValue(throwError(errorResponse));

    // Act
    component.onSubmit();

    // Assert
    expect(component.message).toBe('Error message');
  });

  it('should save payee successfully', () => {
    // Arrange
    const payee = { id: 1, name: 'Test Payee' };
    spyOn(component['payeeService'], 'createNewPayee').and.returnValue(of(payee));
    spyOn(component, 'redirectTo');

    // Act
    component.onSubmit();

    // Assert
    expect(component.redirectTo).toHaveBeenCalledWith('payee');
    expect(component.message).toBe('Saving new payee...');
  });

  it('should set isNameValid to true when name is valid', () => {
    // Arrange
    component.newPayee.name = 'Valid Name';

    // Act
    component.checkIfNameIsValid();

    // Assert
    expect(component.isNameValid).toBe(true);
  });

  it('should set isNameValid to false when name is too short', () => {
    // Arrange
    component.newPayee.name = 'No';

    // Act
    component.checkIfNameIsValid();

    // Assert
    expect(component.isNameValid).toBe(false);
  });

  it('should set isNameValid to false when name is empty', () => {
    // Arrange
    component.newPayee.name = '';

    // Act
    component.checkIfNameIsValid();

    // Assert
    expect(component.isNameValid).toBe(false);
  });

  it('should set isNameValid to false when name is null', () => {
    // Arrange
    component.newPayee.name = null;

    // Act
    component.checkIfNameIsValid();

    // Assert
    expect(component.isNameValid).toBe(false);
  });

  it('should set isNameValid to false when name is undefined', () => {
    // Arrange
    component.newPayee.name = undefined;

    // Act
    component.checkIfNameIsValid();

    // Assert
    expect(component.isNameValid).toBe(false);
  });
});
