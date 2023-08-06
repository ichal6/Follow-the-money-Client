import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { EnterPageComponent } from './enter-page.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Subscription} from 'rxjs';

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

  it('should can run ngOnDestroy when component quick create and immediately destroy', () => {
    // given
    const spyUnsubscribe = spyOn(Subscription.prototype, 'unsubscribe');
    fixture = TestBed.createComponent(EnterPageComponent);
    component = fixture.componentInstance;
    // when
    component.ngOnDestroy();
    // then
    expect(spyUnsubscribe).toHaveBeenCalledTimes(0);
  })

  it('should hide popup when click close button', () => {
    // given
    component.isDisplay = true;
    // when
    component.closePopup();
    // then
    expect(component.isDisplay).toBe(false);
  });
});
