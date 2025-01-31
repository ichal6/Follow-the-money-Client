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

  it('should set formAction to "transaction" and displayAdd based on window width on initialization', () => {
    // Arrange
    const largeWidth = 1200;
    spyOnProperty(window, 'innerWidth').and.returnValue(largeWidth);

    // Act
    component.ngOnInit();

    // Assert
    expect(component.formChangeService.formAction).toBe('transaction');
    expect(component.displayAdd).toBeTrue();
  });

  it('should set formAction to "add" on destruction', () => {
    // Act
    component.ngOnDestroy();

    // Assert
    expect(component.formChangeService.formAction).toBe('add');
  });


  it('should update displayAdd based on window width on resize if not being edited', () => {
    // Arrange
    const largeWidth = 1200;
    const smallWidth = 800;
    const spy = spyOnProperty(window, 'innerWidth').and.returnValue(largeWidth);

    // Act
    component.onWindowResize();

    // Assert
    expect(component.displayAdd).toBeTrue();

    // Arrange
    spy.and.returnValue(smallWidth);

    // Act
    component.onWindowResize();

    // Assert
    expect(component.displayAdd).toBeFalse();
  });

  it('should not update displayAdd on resize if being edited', () => {
    // Arrange
    const initialDisplayAdd = component.displayAdd;

    // Act
    component.onWindowResize();

    // Assert
    expect(component.displayAdd).toBe(initialDisplayAdd);
  });

  it('should keep the form visible when window is resized after clicking Add Transaction on a device with less than 1100px', () => {
    // Arrange
    const smallWidth = 800;
    spyOnProperty(window, 'innerWidth').and.returnValue(smallWidth);
    component.ngOnInit();
    component.addPayment(); // Simulate clicking Add Transaction

    // Act
    component.onWindowResize();

    // Assert
    expect(component.displayAdd).toBeTrue();
  });

  it('should keep displayAdd true after resizing to large width', () => {
    // Arrange
    const smallWidth = 800;
    const largeWidth = 1200;
    const spy = spyOnProperty(window, 'innerWidth').and.returnValue(smallWidth);
    component.ngOnInit();

    // Act
    component.addPayment(); // Simulate clicking Add Transaction
    spy.and.returnValue(largeWidth);
    component.onWindowResize();

    // Assert
    expect(component.displayAdd).toBeTrue();
  });

  it('should keep displayAdd true after resizing height', () => {
    // Arrange
    const smallWidth = 800;
    const smallHeight = 1200;
    const largeHeight = 1200;
    spyOnProperty(window, 'innerWidth').and.returnValue(smallWidth);
    const spy = spyOnProperty(window, 'innerHeight').and.returnValue(smallHeight);
    component.ngOnInit();

    // Act
    component.addPayment(); // Simulate clicking Add Transaction
    spy.and.returnValue(largeHeight);
    component.onWindowResize();

    // Assert
    expect(component.displayAdd).toBeTrue();
  });
});
