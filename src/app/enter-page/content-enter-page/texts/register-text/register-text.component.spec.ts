import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegisterTextComponent } from './register-text.component';

describe('RegisterTextComponent', () => {
  let component: RegisterTextComponent;
  let fixture: ComponentFixture<RegisterTextComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
