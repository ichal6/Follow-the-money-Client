import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AnalysisTableRow} from "../../../../model/AnalysisTableRow";
import {AnalysisService} from "../../../../service/analysis.service";
import {PaymentType} from "../../../../model/PaymentType";
import {AnalysisBuilder} from "../../../../model/AnalysisBuilder";

@Component({
  selector: 'app-financial-summary',
  templateUrl: './financial-summary.component.html',
  styleUrls: ['./financial-summary.component.css']
})
export class FinancialSummaryComponent implements OnInit, OnDestroy{
  private readonly maxDisplay = 15;
  private subscribeTableContent: Subscription;
  selectedType: string;
  tableData: AnalysisTableRow[] = [];
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
        next: (res) => this.tableData = res,
        error: (err) => console.log('problem with getting the table rows: ', err),
        complete: () => this.updateChart()
      });
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
    let topData = this.tableData
      .filter(this.filterZeroValue())
      .sort(this.compare());
    if (topData.length > this.maxDisplay) {
      const value = topData.slice(this.maxDisplay, topData.length).reduce(
        (result, obj) => obj.expense + result , 0)
        .toFixed(2);

      topData = topData.slice(0, this.maxDisplay);
      topData.push(new AnalysisBuilder().name("Other").value(value).build());
    }
    this.chartData = [{
      data: topData.map(this.mapByType()),
      backgroundColor: ["#fd7f6f", "#7eb0d5", "#b2e061", "#bd7ebe", "#ffb55a", "#ffee65", "#beb9db", "#fdcce5", "#8bd3c7"]
    }];
    this.chartLabels =  topData.map(d => d.name);
  }
}
