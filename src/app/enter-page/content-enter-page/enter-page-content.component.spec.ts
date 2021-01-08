import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EnterPageContentComponent } from './enter-page-content.component';

describe('LoginPageComponent', () => {
  let component: EnterPageContentComponent;
  let fixture: ComponentFixture<EnterPageContentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterPageContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterPageContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
