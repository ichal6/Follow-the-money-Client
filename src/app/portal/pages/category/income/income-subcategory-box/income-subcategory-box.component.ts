import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subcategory} from '../../../../../model/Category';
import {PopupService} from '../../../../../service/popup.service';
import {CategoryService} from '../../../../../service/category.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {FormChangeService} from '../../../../../service/form-change.service';

@Component({
  selector: 'app-income-subcategory-box',
  templateUrl: './income-subcategory-box.component.html',
  styleUrls: ['./income-subcategory-box.component.css']
})
export class IncomeSubcategoryBoxComponent implements OnInit, OnDestroy {
  modeDisplayPopup: string;
  coordinates = [];
  deleteSubscription1: Subscription;

  @Input()
  subcategory = new Subcategory();
  @Input()
  categoryId: number;

  constructor(private popupService: PopupService,
              private categoryService: CategoryService,
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
    this.deleteSubscription1 = this.categoryService.deleteSubcategory(this.categoryId, id).subscribe(
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
    this.router.navigate(['/category']);
  }

  changeFormToEdit(): void {
    this.formChangeService.changeFormToEditForSubcategory(this.categoryId, this.subcategory);
  }

  ngOnDestroy(): void {
    if (this.deleteSubscription1 != null){
      this.deleteSubscription1.unsubscribe();
      this.reloadComponent();
    }
  }
}
