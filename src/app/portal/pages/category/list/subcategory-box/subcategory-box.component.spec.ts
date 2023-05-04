import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoryBoxComponent } from './subcategory-box.component';

describe('SubcategoryBoxComponent', () => {
  let component: SubcategoryBoxComponent;
  let fixture: ComponentFixture<SubcategoryBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcategoryBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubcategoryBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
