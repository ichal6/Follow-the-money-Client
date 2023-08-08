import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferFormEditComponent } from './transfer-form-edit.component';

describe('TransferFormEditComponent', () => {
  let component: TransferFormEditComponent;
  let fixture: ComponentFixture<TransferFormEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransferFormEditComponent]
    });
    fixture = TestBed.createComponent(TransferFormEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
