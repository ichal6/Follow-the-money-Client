import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  const selectedColor = 'rgb(11, 209, 184)';

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          useValue: {
            url: '/portal'
          }
        }
      ],
      declarations: [ MenuComponent ],
      imports: [
        HttpClientTestingModule, RouterTestingModule, FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should highlighted selected link', () => {
    const color = fixture.debugElement.nativeElement.querySelector('#portal').style.color;
    expect(color).toBe(selectedColor);
  });

  it('should not highlighted unselected link', () => {
    const color = fixture.debugElement.nativeElement.querySelector('#accounts').style.color;
    expect(color).toBe('');
  });
});
