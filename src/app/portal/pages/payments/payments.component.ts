import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {FormChangeService} from '../../../service/form-change.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
  standalone: false
})
export class PaymentsComponent implements OnInit, OnDestroy {
  public displayAdd: boolean;
  private isBeenEdited: boolean;
  private readonly TABLET_SIZE_WIDTH: number = 1100;

  constructor(public formChangeService: FormChangeService) { }

  ngOnInit(): void {
    this.formChangeService.formAction = 'transaction';
    this.displayAdd = window.innerWidth > this.TABLET_SIZE_WIDTH;
    this.isBeenEdited = false;
  }

  ngOnDestroy(): void {
    this.formChangeService.formAction = 'add';
  }

  addPayment() {
    this.displayAdd = this.displayAdd !== true;
    this.isBeenEdited = this.isBeenEdited !== true;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    if(!this.isBeenEdited)
      this.displayAdd = window.innerWidth > this.TABLET_SIZE_WIDTH;
  }
}
