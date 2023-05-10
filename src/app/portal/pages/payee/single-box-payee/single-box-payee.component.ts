import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Payee} from '../../../../model/Payee';
import {PopupService} from '../../../../service/popup.service';
import {FormChangeService} from '../../../../service/form-change.service';
import {Router} from '@angular/router';
import {PayeeService} from '../../../../service/payee.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-single-box-payee',
  templateUrl: './single-box-payee.component.html',
  styleUrls: ['./single-box-payee.component.css']
})
export class SingleBoxPayeeComponent implements OnInit, OnDestroy {
  static count = 0;
  modeDisplayPopup: string;
  coordinates = [];
  deleteSubscription: Subscription;
  colorsArray = ['#F4BB4A', '#F31259', '#FF7D44', '#564193'];
  currentColor: string;

  @Input()
  public payee: Payee;

  constructor(private popupService: PopupService,
              private payeeService: PayeeService,
              private formChangeService: FormChangeService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.modeDisplayPopup = 'none';
    this.currentColor =  this.getColor();
  }

  displayPopup(event): void {
    const coordinates = [];
    this.popupService.displayPopup(event, coordinates);
    this.coordinates = coordinates;
    if (this.modeDisplayPopup === 'none') {
      this.modeDisplayPopup = 'block';
    } else {
      this.modeDisplayPopup = 'none';
    }
  }

  deleteButton(id): void{
    this.deleteSubscription = this.payeeService.deletePayee(id).subscribe(
      next => {
        this.ngOnDestroy();
      },
      error => {
        console.log('Problem with server side');
      }
    );
  }

  reloadComponent(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/payee']);
  }

  changeFormToEdit(): void {
    this.formChangeService.changeFormToEditForPayee(this.payee);
  }

  ngOnDestroy(): void {
    if (this.deleteSubscription != null){
      this.deleteSubscription.unsubscribe();
      this.reloadComponent();
    }
  }

  getColor(): string {
    if (SingleBoxPayeeComponent.count >= this.colorsArray.length) {
      SingleBoxPayeeComponent.count = 0;
    }
    return this.colorsArray[SingleBoxPayeeComponent.count++];
  }

}
