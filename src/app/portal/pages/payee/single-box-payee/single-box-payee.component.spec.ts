import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleBoxPayeeComponent } from './single-box-payee.component';

describe('SingleBoxPayeeComponent', () => {
  let component: SingleBoxPayeeComponent;
  let fixture: ComponentFixture<SingleBoxPayeeComponent>;

  beforeEach(async(() => {
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
