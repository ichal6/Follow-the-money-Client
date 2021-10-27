import { TestBed } from '@angular/core/testing';

import { PopupService } from './popup.service';
import {HttpClientModule} from '@angular/common/http';

describe('PopupService', () => {
  let service: PopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
    });
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
