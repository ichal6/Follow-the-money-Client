import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTextComponent } from './register-text.component';

describe('RegisterTextComponent', () => {
  let component: RegisterTextComponent;
  let fixture: ComponentFixture<RegisterTextComponent>;

  beforeEach(async(() => {
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
