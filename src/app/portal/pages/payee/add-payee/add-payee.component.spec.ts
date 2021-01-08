import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddPayeeComponent } from './add-payee.component';

describe('AddPayeeComponent', () => {
  let component: AddPayeeComponent;
  let fixture: ComponentFixture<AddPayeeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPayeeComponent ]
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
});
