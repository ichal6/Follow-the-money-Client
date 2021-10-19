import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SingleActivityComponent } from './single-activity.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {Activity} from '../../../../../model/Activity';

describe('SingleActivityComponent', () => {
  let component: SingleActivityComponent;
  let fixture: ComponentFixture<SingleActivityComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleActivityComponent ],
      imports: [
        HttpClientTestingModule, RouterTestingModule, FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleActivityComponent);
    component = fixture.componentInstance;

    const expectedActivity = new Activity();
    expectedActivity.title = 'NewActivity';
    component.activity = expectedActivity;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
