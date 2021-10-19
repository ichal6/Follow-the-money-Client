import { TestBed } from '@angular/core/testing';

import { AuthRouteGuardService } from './auth-route-guard.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';

describe('AuthRouteGuardService', () => {
  let service: AuthRouteGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, RouterTestingModule, FormsModule
      ]
    });
    service = TestBed.inject(AuthRouteGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
