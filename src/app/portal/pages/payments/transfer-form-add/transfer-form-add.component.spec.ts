import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TransferFormAddComponent } from './transfer-form-add.component';

describe('TransferFormAddComponent', () => {
  let component: TransferFormAddComponent;
  let fixture: ComponentFixture<TransferFormAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferFormAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferFormAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
