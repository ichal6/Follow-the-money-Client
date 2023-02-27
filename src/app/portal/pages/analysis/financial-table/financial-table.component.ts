import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AnalysisService} from '../../../../service/analysis.service';
import {AnalysisTableRow} from '../../../../model/AnalysisTableRow';

@Component({
  selector: 'app-financial-table',
  templateUrl: './financial-table.component.html',
  styleUrls: ['./financial-table.component.css']
})
export class FinancialTableComponent  implements OnInit {
  private subscribeTableContent: Subscription;
  tableData: AnalysisTableRow[] = [];

  constructor(private analysisService: AnalysisService) {
  }

  ngOnInit() {
    this.updateData();
  }

  updateData(eventData?: { period: number }) : void {
    this.subscribeTableContent = this.analysisService.getAnalysisDataRows().subscribe({
      next: (res) => this.tableData = res,
      error: (err) =>
        console.log('problem with getting the table rows: ', err)
      ,
      complete: () => console.log('Completed fetch table data')
    });
  }
}
