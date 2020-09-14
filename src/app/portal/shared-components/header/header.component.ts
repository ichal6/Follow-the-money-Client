import { Component, OnInit } from '@angular/core';
import {DataService} from '../../../service/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName: string;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getUser().subscribe(
      nextUser => {
        this.userName = nextUser.name;
      },
      error => {
        console.log('spmething went wrong');
      }
    );
  }

}
