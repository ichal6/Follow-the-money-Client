import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditPayeeComponent } from './edit-payee.component';

describe('EditPayeeComponent', () => {
  let component: EditPayeeComponent;
  let fixture: ComponentFixture<EditPayeeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPayeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPayeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
