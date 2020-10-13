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
  modeDisplayPopup: string;
  coordinates = [];
  deleteSubscription: Subscription;

  @Input()
  public payee: Payee;

  constructor(private popupService: PopupService,
              private payeeService: PayeeService,
              private formChangeService: FormChangeService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.modeDisplayPopup = 'none';
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
  //   this.formChangeService.changeFormToEditForCategory(this.category);
  }

  ngOnDestroy(): void {
    if (this.deleteSubscription != null){
      this.deleteSubscription.unsubscribe();
      this.reloadComponent();
    }
  }

}
