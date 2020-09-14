import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  public chartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public chartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public chartData = [
    {data: [2000, 2500, 1800, 2100, 2300, 500, 200, 2000, 1000, 4000, 200, 4000], label: 'Income', fill: false},
    {data: [1500, 1200, 2000, 2000, 1000, 2000, 300, 1000, 1000, 3000, 200, 250], label: 'Expenses', fill: false}
  ];
  public chartType = 'line';
  public chartLegend = true;

  constructor() {
  }

  ngOnInit(): void {
  }

}
