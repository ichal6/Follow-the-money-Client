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
});
