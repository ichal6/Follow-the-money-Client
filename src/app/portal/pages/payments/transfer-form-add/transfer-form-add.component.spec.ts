import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferFormAddComponent } from './transfer-form-add.component';

describe('TransferFormAddComponent', () => {
  let component: TransferFormAddComponent;
  let fixture: ComponentFixture<TransferFormAddComponent>;

  beforeEach(async(() => {
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
