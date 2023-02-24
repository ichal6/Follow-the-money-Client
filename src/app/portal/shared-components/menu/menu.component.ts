import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, AfterViewInit {
  private selectedHref: string;
  @ViewChildren("href") hrefs: QueryList<ElementRef>;

  constructor(private route: Router) { }

  ngOnInit(): void {
    this.selectedHref = this.route.url;
  }

  ngAfterViewInit(): void {
    const actualPageHref = this.hrefs.filter(a => a.nativeElement.id === this.selectedHref.substring(1))[0];
    actualPageHref.nativeElement.style.color = '#0BD1B8';
    actualPageHref.nativeElement.firstChild.style.filter = 'invert(70%) sepia(100%) saturate(3.5) hue-rotate(60deg)';
  }

  navigateTo(page: string): void {
    this.route.navigate([page]);
  }


}
