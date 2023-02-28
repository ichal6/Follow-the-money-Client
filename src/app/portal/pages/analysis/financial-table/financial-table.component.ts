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
    let startDate = '1970-01-01';
    if(eventData !== undefined && eventData.period > 0) {
      const date = new Date();
      date.setDate(new Date().getDate() - eventData.period);
      startDate = date.toISOString().substring(0,10);
    }
    this.subscribeTableContent = this.analysisService.getAnalysisDataRows(startDate).subscribe({
      next: (res) => this.tableData = res,
      error: (err) => console.log('problem with getting the table rows: ', err),
      complete: () => console.log('Completed fetch table data')
    });
  }
}
