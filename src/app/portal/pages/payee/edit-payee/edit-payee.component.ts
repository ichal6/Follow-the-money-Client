import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-edit-payee',
  templateUrl: './edit-payee.component.html',
  styleUrls: ['./edit-payee.component.css']
})
export class EditPayeeComponent implements OnInit {

  @Input()
  public updatePayee: any;

  constructor() { }

  ngOnInit(): void {
  }

}
