import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeBoxComponent } from './income-box.component';

describe('IncomeBoxComponent', () => {
  let component: IncomeBoxComponent;
  let fixture: ComponentFixture<IncomeBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
