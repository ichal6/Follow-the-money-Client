import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Category} from '../../../../../model/Category';
import {PopupService} from '../../../../../service/popup.service';
import {CategoryService} from '../../../../../service/category.service';
import {FormChangeService} from '../../../../../service/form-change.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-category-box',
  templateUrl: './category-box.component.html',
  styleUrls: ['./category-box.component.css']
})
export class CategoryBoxComponent implements OnInit, OnDestroy {
  static count = 0;
  modeDisplayPopup: string;
  coordinates = [];
  deleteSubscription2: Subscription;
  colorsArray = ['#F4BB4A', '#F31259', '#FF7D44', '#564193'];
  currentColor: string;

  @Input()
  category = new Category();

  constructor(private popupService: PopupService,
              private categoryService: CategoryService,
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

  deleteButton(id): void {
    this.deleteSubscription2 = this.categoryService.deleteCategory(id).subscribe(
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
    this.formChangeService.changeFormToEditForCategory(this.category);
  }

  getColor(): string {
    if (CategoryBoxComponent.count >= this.colorsArray.length) {
      CategoryBoxComponent.count = 0;
    }
    return this.colorsArray[CategoryBoxComponent.count++];
  }

  ngOnDestroy(): void {
    if (this.deleteSubscription2 != null) {
      this.deleteSubscription2.unsubscribe();
      this.reloadComponent();
    }
  }
}
