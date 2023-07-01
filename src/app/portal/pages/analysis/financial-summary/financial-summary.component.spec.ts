import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialSummaryComponent } from './financial-summary.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {By} from "@angular/platform-browser";
import {RouterTestingModule} from "@angular/router/testing";
import {of} from "rxjs";
import {spyDataServiceGetEmail} from '../../../../service/common/SpyObjects';

describe('FinancialSummaryComponent', () => {
  let component: FinancialSummaryComponent;
  let fixture: ComponentFixture<FinancialSummaryComponent>;
  let mockService;

  beforeEach(async () => {
    spyDataServiceGetEmail();

    mockService = jasmine.createSpyObj( 'AnalysisService', ['getAnalysisDataRows', 'validateParams']);
    mockService.getAnalysisDataRows.and.returnValue(of([]))
    mockService.validateParams.and.returnValue(of({startDate: '1970-01-01', type: 'accounts'}))
    await TestBed.configureTestingModule({
      declarations: [ FinancialSummaryComponent ],
      imports: [
        HttpClientTestingModule, RouterTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialSummaryComponent);
    component = fixture.componentInstance;
    component.chartData = [{
      data: []
    }];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display h1 as name value', () => {
    // given
    const name = 'Income';
    // when
    component.name = name;
    fixture.detectChanges();
    const displayName = fixture.debugElement.nativeElement.querySelector('h1').innerHTML;
    // then
    expect(displayName).toBe(name);
  });

  it('should display none when name is not set', () => {
    // given
    const name = '';
    // when
    const displayName = fixture.debugElement.nativeElement.querySelector('h1').innerHTML;
    // then
    expect(displayName).toBe(name);
  });

  it('should display No data message if summary is empty', () => {
    // given
    const message = 'No Data Available';
    // when
    fixture.detectChanges();
    const divElement = fixture.debugElement.queryAll(By.css('.no-data'));
    const displayName = divElement[0].nativeElement.innerHTML;
    // then
    expect(displayName).toContain(message);
  });
});
