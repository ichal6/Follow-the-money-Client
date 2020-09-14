import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPortalLayoutComponent } from './main-portal-layout.component';

describe('MainPortalLayoutComponent', () => {
  let component: MainPortalLayoutComponent;
  let fixture: ComponentFixture<MainPortalLayoutComponent>;

  beforeEach(async(() => {
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
