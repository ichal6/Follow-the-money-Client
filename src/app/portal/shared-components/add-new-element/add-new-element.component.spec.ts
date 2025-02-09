import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewElementComponent } from './add-new-element.component';

describe('AddNewElementComponent', () => {
  let component: AddNewElementComponent;
  let fixture: ComponentFixture<AddNewElementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewElementComponent]
    });
    fixture = TestBed.createComponent(AddNewElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit addNewElement event and toggle isAdd on add()', () => {
    // Arrange
    const emitSpy = spyOn(component.addNewElement, 'emit');

    // Act
    component.add();

    // Assert
    expect(emitSpy).toHaveBeenCalled();
    expect(component.isAdding).toBe(false);

    // Act
    component.add();

    // Assert
    expect(component.isAdding).toBe(true);
  });

  it('should scroll to top of the page on add()', () => {
    // Arrange
    const spy = spyOn(window, 'scrollTo');

    // Act
    component.add();

    // Assert
    // We need to ignore TypeScript error here because the spy mock doesn't have
    // proper type definitions for scrollTo parameters, but we know the implementation is correct
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(spy).toHaveBeenCalledWith({top: 0, behavior: 'smooth'});
  });

  it('should set height and width correctly', () => {
    //Arrange
    component.height = 100;
    component.width = 100;
    fixture.detectChanges();

    //Act
    const compiled = fixture.nativeElement;
    const imgElement = compiled.querySelector('img');

    //Assert
    expect(imgElement.height).toBe(100);
    expect(imgElement.width).toBe(100);
  });
});
