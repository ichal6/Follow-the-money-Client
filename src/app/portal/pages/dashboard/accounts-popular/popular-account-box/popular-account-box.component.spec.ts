import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PopularAccountBoxComponent } from './popular-account-box.component';

describe('PopularAccountBoxComponent', () => {
  let component: PopularAccountBoxComponent;
  let fixture: ComponentFixture<PopularAccountBoxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularAccountBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularAccountBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
