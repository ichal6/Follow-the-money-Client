import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {HttpClientModule} from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
    });
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('check that the event emitter is firing an event when logout method was run', () =>
  {
    spyOn(service.authenticationResultEvent, 'emit');
    service.logout();
    expect(service.authenticationResultEvent.emit).toHaveBeenCalledWith(false);
  });

});
