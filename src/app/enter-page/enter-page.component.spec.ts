import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EnterPageComponent } from './enter-page.component';

describe('LoginComponent', () => {
  let component: EnterPageComponent;
  let fixture: ComponentFixture<EnterPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
