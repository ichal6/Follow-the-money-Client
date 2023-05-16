import { TestBed } from '@angular/core/testing';

import { AnalysisService } from './analysis.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AnalysisService', () => {
  let service: AnalysisService;
  const startingTime = '2022-05-16';

  beforeEach(() => {
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date(startingTime));

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(AnalysisService);
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should return correct params for correct input', () => {
    // given
    const input = {period: 365, type: 'payees'};
    const expectedOutput = {startDate: '2021-05-16', type: 'payees'};
    // when
    const output = service.validateParams(input);
    // then
    expect(output).toEqual(expectedOutput);
  });

  it('should return default date for incorrect input', () => {
    // given
    const input = {period: -1, type: 'payees'};
    const expectedOutput = {startDate: '1970-01-01', type: 'payees'};
    // when
    const output = service.validateParams(input);
    // then
    expect(output).toEqual(expectedOutput);
  });

  it('should return default type for incorrect input', () => {
    // given
    const input = {period: 365, type: undefined};
    const expectedOutput = {startDate: '2021-05-16', type: 'accounts'};
    // when
    const output = service.validateParams(input);
    // then
    expect(output).toEqual(expectedOutput);
  });

  it('should return default params for undefined', () => {
    // given
    const input = undefined;
    const expectedOutput = {startDate: '1970-01-01', type: 'accounts'};
    // when
    const output = service.validateParams(input);
    // then
    expect(output).toEqual(expectedOutput);
  });
});
