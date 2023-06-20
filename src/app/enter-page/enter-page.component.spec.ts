import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EnterPageComponent } from './enter-page.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('LoginComponent', () => {
  let component: EnterPageComponent;
  let fixture: ComponentFixture<EnterPageComponent>;
  let httpClient: HttpClientTestingModule;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    httpClient = TestBed.inject(HttpClientTestingModule);
    fixture = TestBed.createComponent(EnterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hide register popup when user logout', () => {
    expect(component.isDisplay).toBe(false);
  })
});
