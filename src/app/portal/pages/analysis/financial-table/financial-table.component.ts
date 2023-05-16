import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AnalysisService} from '../../../../service/analysis.service';
import {AnalysisTableRow} from '../../../../model/AnalysisTableRow';

@Component({
  selector: 'app-financial-table',
  templateUrl: './financial-table.component.html',
  styleUrls: ['./financial-table.component.css']
})
export class FinancialTableComponent  implements OnInit, OnDestroy {
  private subscribeTableContent: Subscription;
  selectedType: string;
  tableData: AnalysisTableRow[] = [];

  constructor(private analysisService: AnalysisService) {
  }

  ngOnInit() {
    this.updateData();
  }

  ngOnDestroy(): void {
    this.subscribeTableContent.unsubscribe();
  }

  updateData(eventData?: { period: number, type: string }) : void {
    const validatedParams = this.analysisService.validateParams(eventData);
    this.selectedType = validatedParams.type;

    this.subscribeTableContent = this.analysisService
      .getAnalysisDataRows(validatedParams.startDate, validatedParams.type).subscribe({
      next: (res) => this.tableData = res.filter(a => a.balance != 0),
      error: (err) => console.log('problem with getting the table rows: ', err),
      complete: () => console.log('Completed fetch table data')
    });
  }
}
