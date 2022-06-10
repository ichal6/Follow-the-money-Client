import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { EnterPageContentComponent } from './enter-page-content.component';

describe('LoginPageComponent', () => {
  let component: EnterPageContentComponent;
  let fixture: ComponentFixture<EnterPageContentComponent>;
  let httpClient: HttpClientTestingModule;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterPageContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    httpClient = TestBed.inject(HttpClientTestingModule);
    fixture = TestBed.createComponent(EnterPageContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
