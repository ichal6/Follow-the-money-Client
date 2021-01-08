import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MainPortalLayoutComponent } from './main-portal-layout.component';

describe('MainPortalLayoutComponent', () => {
  let component: MainPortalLayoutComponent;
  let fixture: ComponentFixture<MainPortalLayoutComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPortalLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPortalLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
