import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterPageContentComponent } from './enter-page-content.component';

describe('LoginPageComponent', () => {
  let component: EnterPageContentComponent;
  let fixture: ComponentFixture<EnterPageContentComponent>;

  beforeEach(async(() => {
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
