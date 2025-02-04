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
    component.savePayee();

    // Assert
    expect(component.message).toBe('Error message');
  });

  it('should save payee successfully', () => {
    // Arrange
    const payee = { id: 1, name: 'Test Payee' };
    spyOn(component['payeeService'], 'createNewPayee').and.returnValue(of(payee));
    spyOn(component, 'redirectTo');

    // Act
    component.savePayee();

    // Assert
    expect(component.redirectTo).toHaveBeenCalledWith('payee');
    expect(component.message).toBeUndefined();
  });
});
