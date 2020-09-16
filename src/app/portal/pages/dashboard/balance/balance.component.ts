import {Component, OnInit} from '@angular/core';
import {DataService} from '../../../../service/data.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {
  totalBalance: number;

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.getDashboard().subscribe(
      next => {
        this.totalBalance = next.totalBalance;
      },
      error => {
        console.log('problem with server side', error);
      }
    );
  }

}
