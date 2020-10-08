import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subcategory} from '../../../../../model/Category';
import {PopupService} from '../../../../../service/popup.service';
import {Subscription} from 'rxjs';
import {CategoryService} from '../../../../../service/category.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-expense-subcategory-box',
  templateUrl: './expense-subcategory-box.component.html',
  styleUrls: ['./expense-subcategory-box.component.css']
})
export class ExpenseSubcategoryBoxComponent implements OnInit, OnDestroy {
  modeDisplayPopup: string;
  coordinates = [];
  deleteSubscription3: Subscription;

  @Input()
  subcategory = new Subcategory();
  @Input()
  categoryId: number;

  constructor(private popupService: PopupService,
              private categoryService: CategoryService,
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
    this.deleteSubscription3 = this.categoryService.deleteSubcategory(this.categoryId, id).subscribe(
      next => {
        console.log('Delete subcategory');
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

  ngOnDestroy(): void {
    if (this.deleteSubscription3 != null){
      this.deleteSubscription3.unsubscribe();
      this.reloadComponent();
    }
  }
}
