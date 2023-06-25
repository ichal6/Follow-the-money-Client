import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import {HttpClientModule} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
    });
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should throw error when could get unset email from cookie', () => {
    expect(() => service.getEmail()).toThrow(new Error('Email is not set'));
  });

  it('should get correct email', () => {
    // given
    const email = "example@company.com";
    spyOn(CookieService.prototype, 'check').and.returnValue(true);
    spyOn(CookieService.prototype, 'get').and.returnValue(email);
    // when / then
    expect(service.getEmail()).toEqual(email);
  })
});
