import {Component, ViewChild, ElementRef, Output, EventEmitter, AfterViewInit, Input} from '@angular/core';
import { of, fromEvent,Observable } from "rxjs";
import { debounceTime, map,distinctUntilChanged,switchMap,tap } from "rxjs/operators";
import {Payee} from "../../../model/Payee";


@Component({
  selector: 'app-autocomplete-dropbox',
  templateUrl: './autocomplete-dropbox.component.html',
  styleUrls: ['./autocomplete-dropbox.component.css'],
  standalone: false
})
export class AutocompleteDropboxComponent implements AfterViewInit {
  @ViewChild('searchInput') searchInput: ElementRef;
  @Input() elements?: Payee[];
  @Output() setElementEvent = new EventEmitter<{id: number}>();

  showSearches: boolean;
  isSearching: boolean;
  searchedElements: Payee[] = [];

  constructor() {
    this.searchedElements = this.elements;
    this.isSearching = false;
    this.showSearches = false;
  }

  ngAfterViewInit() {
    this.search();
  }

  getElements(name): Observable<any> {
    return of(this.filterElements(name));
  }

  filterElements(name: string): Payee[] {
    return this.elements.filter(
      (el: Payee) => el.name.toLowerCase().includes(name.toLowerCase()) == true);
  }

  search() {
    const search$ = fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      map((event: any) => event.target.value),
      debounceTime(500),
      distinctUntilChanged(),
      tap(()=> this.isSearching = true),
      switchMap((term) => term ? this.getElements(term) : of<any>(this.elements)),
      tap(() => {
        this.isSearching = false;
        this.showSearches = true;
      }));

    search$.subscribe(data => {
      this.isSearching = false
      this.searchedElements = data;
    })
  }

  setElement(element: Payee) {
    const id = element.id;

    this.searchedElements = this.filterElements(element.name);
    this.setElementEvent.emit({id});
    this.searchInput.nativeElement.value = element.name;
    this.showSearches = false;
  }

  trackById(index,item):void{
    return item._id;
  }

  closeDropDown():void {
    this.showSearches = false;
  }
}
