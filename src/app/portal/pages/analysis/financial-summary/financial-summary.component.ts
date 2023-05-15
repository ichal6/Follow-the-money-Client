import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Chart} from 'chart.js';
import {AnalysisTableRow} from "../../../../model/AnalysisTableRow";
import {AnalysisService} from "../../../../service/analysis.service";
import {PaymentType} from "../../../../model/PaymentType";

@Component({
  selector: 'app-financial-summary',
  templateUrl: './financial-summary.component.html',
  styleUrls: ['./financial-summary.component.css']
})
export class FinancialSummaryComponent implements OnInit, OnDestroy{
  private subscribeTableContent: Subscription;
  selectedType: string;
  tableData: AnalysisTableRow[] = [];
  public chart: Chart;
  @Input()
  name: string;
  @Input()
  type: PaymentType
  public chartLabels = [];
  public chartData;
  public chartType = 'doughnut';
  public chartLegend = true;
  public chartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right'
      }
    }
  };


  constructor(private analysisService: AnalysisService) {
    Chart.overrides['doughnut'].plugins.legend.display = false;
  }

  ngOnInit() {
    this.updateData();
  }

  ngOnDestroy(): void {
    this.subscribeTableContent.unsubscribe();
  }

  private compare() {
    if (PaymentType.INCOME == this.type) {
      return (a, b) => a.income > b.income ? -1 : 1;
    } else {
      return (a, b) => a.expense > b.expense ? -1 : 1;
    }
  }

  private mapByType() {
    if (PaymentType.INCOME == this.type) {
      return d => d.income;
    } else {
      return d => d.expense;
    }
  }

  private filterZeroValue() {
    if (PaymentType.INCOME == this.type) {
      return d => d.income > 0;
    } else {
      return d => d.expense > 0;
    }
  }

  private updateChart() {
    const topData = this.tableData
      .filter(this.filterZeroValue())
      .sort(this.compare())
      // .slice(0, 2);
    this.chartData = [{
      data: topData.map(this.mapByType())
    }];
    this.chartLabels =  topData.map(d => d.name);
  }

  updateData(eventData?: { period: number, type: string }) : void {
    const validatedParams = this.analysisService.validateParams(eventData);
    this.selectedType = validatedParams.type;

    this.subscribeTableContent = this.analysisService
      .getAnalysisDataRows(validatedParams.startDate, validatedParams.type).subscribe({
      next: (res) => this.tableData = res,
      error: (err) => console.log('problem with getting the table rows: ', err),
      complete: () => this.updateChart()
    });
  }
}
