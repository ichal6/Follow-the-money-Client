import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoryBoxComponent } from './subcategory-box.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';

describe('SubcategoryBoxComponent', () => {
  let component: SubcategoryBoxComponent;
  let fixture: ComponentFixture<SubcategoryBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcategoryBoxComponent ],
      imports: [
        HttpClientModule, RouterTestingModule
      ]
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
