import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPayeeComponent } from './edit-payee.component';

describe('EditPayeeComponent', () => {
  let component: EditPayeeComponent;
  let fixture: ComponentFixture<EditPayeeComponent>;

  beforeEach(async(() => {
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
