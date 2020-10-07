import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Category} from '../../../../../model/Category';
import {PopupService} from '../../../../../service/popup.service';
import {CategoryService} from '../../../../../service/category.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-income-box',
  templateUrl: './income-box.component.html',
  styleUrls: ['./income-box.component.css']
})
export class IncomeBoxComponent implements OnInit, OnDestroy {
  modeDisplayPopup: string;
  coordinates = [];
  deleteSubscription2: Subscription;

  @Input()
  category = new Category();

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
      this.deleteSubscription2 = this.categoryService.deleteCategory(id).subscribe(
        next => {
          console.log('Delete category');
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
    if (this.deleteSubscription2 != null){
      this.deleteSubscription2.unsubscribe();
    }
    this.reloadComponent();
  }
}
