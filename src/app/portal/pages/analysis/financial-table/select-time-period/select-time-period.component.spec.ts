import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTimePeriodComponent } from './select-time-period.component';
import {FormsModule} from '@angular/forms';

describe('SelectTimePeriodComponent', () => {
  let component: SelectTimePeriodComponent;
  let fixture: ComponentFixture<SelectTimePeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
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
