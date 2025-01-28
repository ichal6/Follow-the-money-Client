import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PaymentsComponent } from './payments.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';

describe('PaymentsComponent', () => {
  let component: PaymentsComponent;
  let fixture: ComponentFixture<PaymentsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentsComponent ],
      imports: [
        HttpClientTestingModule, RouterTestingModule, FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize with correct default values', () => {
    // Arrange
    const expectedDisplayAdd = window.innerWidth > 1100;
    const expectedFormAction = 'transaction';

    // Act
    const actualDisplayAdd = component.displayAdd;
    const actualFormAction = component.formChangeService.formAction;

    // Assert
    expect(actualDisplayAdd).toBe(expectedDisplayAdd);
    expect(actualFormAction).toBe(expectedFormAction);
  });

  it('should toggle displayAdd value when addPayment is called', () => {
    // Arrange
    const initialDisplayAdd = component.displayAdd;

    // Act
    component.addPayment();

    // Assert
    expect(component.displayAdd).toBe(!initialDisplayAdd);
  });

  it('should update displayAdd to true on window resize with large width', () => {
    // Arrange
    const largeWidth = 1200;
    spyOnProperty(window, 'innerWidth').and.returnValue(largeWidth);

    // Act
    component.onWindowResize();

    // Assert
    expect(component.displayAdd).toBeTrue();
  });

  it('should update displayAdd to false on window resize with small width', () => {
    // Arrange
    const smallWidth = 800;
    spyOnProperty(window, 'innerWidth').and.returnValue(smallWidth);

    // Act
    component.onWindowResize();

    // Assert
    expect(component.displayAdd).toBeFalse();
  });

  it('should set displayAdd to false when window width equals tabletSizeWidth', () => {
    // Arrange
    const tabletSizeWidth = 1100;
    spyOnProperty(window, 'innerWidth').and.returnValue(tabletSizeWidth);

    // Act
    component.onWindowResize();

    // Assert
    expect(component.displayAdd).toBeFalse();
  });

  it('should set displayAdd to false when window width is just below tabletSizeWidth', () => {
    // Arrange
    const widthBelowTabletSize = 1099;
    spyOnProperty(window, 'innerWidth').and.returnValue(widthBelowTabletSize);

    // Act
    component.onWindowResize();

    // Assert
    expect(component.displayAdd).toBeFalse();
  });

  it('should set displayAdd to true when window width is just above tabletSizeWidth', () => {
    // Arrange
    const widthAboveTabletSize = 1101;
    spyOnProperty(window, 'innerWidth').and.returnValue(widthAboveTabletSize);

    // Act
    component.onWindowResize();

    // Assert
    expect(component.displayAdd).toBeTrue();
  });
});
