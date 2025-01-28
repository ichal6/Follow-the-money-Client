import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {FormChangeService} from '../../../service/form-change.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit, OnDestroy {
  public displayAdd: boolean;
  private readonly TABLET_SIZE_WIDTH: number = 1100;

  constructor(public formChangeService: FormChangeService) { }

  ngOnInit(): void {
    this.formChangeService.formAction = 'transaction';
    this.displayAdd = window.innerWidth > this.TABLET_SIZE_WIDTH;
  }

  ngOnDestroy(): void {
    this.formChangeService.formAction = 'add';
  }

  addPayment() {
    this.displayAdd = this.displayAdd !== true;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.displayAdd = window.innerWidth > this.TABLET_SIZE_WIDTH;
  }
}
