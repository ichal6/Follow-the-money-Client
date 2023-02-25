import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-financial-table',
  templateUrl: './financial-table.component.html',
  styleUrls: ['./financial-table.component.css']
})
export class FinancialTableComponent  implements OnInit {
  tableData: any[] = [];

  ngOnInit() {
    this.updateData();
  }

  updateData(eventData?: { period: number }) : void {
    console.log('update');
    console.log(eventData === undefined);
    this.tableData = [
      {
        categoryName: 'Sport',
        income: 40,
        expense: 50,
        balance: -10
      },
      {
        categoryName: 'All',
        income: 40,
        expense: 50,
        balance: -10
      }
    ];
  }
}
