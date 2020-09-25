import {Component, Input, OnInit} from '@angular/core';
import {Dashboard} from '../../../../model/Dashboard';
import {EventService} from '../../../../service/event.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input()
  dashboard = new Dashboard();

  public chartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public chartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public chartData = [
    {data: [], label: 'Expenses', fill: false},
    {data: [], label: 'Income', fill: false}
  ];
  public chartType = 'line';
  public chartLegend = true;

  constructor(private eventService: EventService) {
  }

  ngOnInit(): void {
    this.eventService.dashboardChangedEvent.subscribe(
        next => {
          this.dashboard = next;
          this.chartData = [
            {data: [
                this.dashboard.expenseFunds.get('JANUARY'),
                this.dashboard.expenseFunds.get('FEBRUARY'),
                this.dashboard.expenseFunds.get('MARCH'),
                this.dashboard.expenseFunds.get('APRIL'),
                this.dashboard.expenseFunds.get('MAY'),
                this.dashboard.expenseFunds.get('JUNE'),
                this.dashboard.expenseFunds.get('JULY'),
                this.dashboard.expenseFunds.get('AUGUST'),
                this.dashboard.expenseFunds.get('SEPTEMBER'),
                this.dashboard.expenseFunds.get('OCTOBER'),
                this.dashboard.expenseFunds.get('NOVEMBER'),
                this.dashboard.expenseFunds.get('DECEMBER'),
              ], label: 'Expenses', fill: false},
            {data: [this.dashboard.incomeFunds.get('JANUARY'),
                this.dashboard.incomeFunds.get('FEBRUARY'),
                this.dashboard.incomeFunds.get('MARCH'),
                this.dashboard.incomeFunds.get('APRIL'),
                this.dashboard.incomeFunds.get('MAY'),
                this.dashboard.incomeFunds.get('JUNE'),
                this.dashboard.incomeFunds.get('JULY'),
                this.dashboard.incomeFunds.get('AUGUST'),
                this.dashboard.incomeFunds.get('SEPTEMBER'),
                this.dashboard.incomeFunds.get('OCTOBER'),
                this.dashboard.incomeFunds.get('NOVEMBER'),
                this.dashboard.incomeFunds.get('DECEMBER'),
              ], label: 'Income', fill: false},
          ];
        });
  }

}
