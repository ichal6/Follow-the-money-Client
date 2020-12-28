import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SingleBoxPayeeComponent } from './single-box-payee.component';

describe('SingleBoxPayeeComponent', () => {
  let component: SingleBoxPayeeComponent;
  let fixture: ComponentFixture<SingleBoxPayeeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleBoxPayeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleBoxPayeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
