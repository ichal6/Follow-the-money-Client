import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTimePeriodComponent } from './select-time-period.component';

describe('SelectTimePeriodComponent', () => {
  let component: SelectTimePeriodComponent;
  let fixture: ComponentFixture<SelectTimePeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectTimePeriodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectTimePeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
