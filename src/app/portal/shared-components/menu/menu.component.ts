import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../service/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, AfterViewInit {
  private selectedHref: string;
  @ViewChildren("href") hrefs: QueryList<ElementRef>;

  constructor(private route: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.selectedHref = this.route.url;
  }

  ngAfterViewInit(): void {
    const actualPageHref = this.hrefs.filter(a => a.nativeElement.id === this.selectedHref.substring(1))[0];
    actualPageHref.nativeElement.style.color = '#0BD1B8';
    actualPageHref.nativeElement.firstChild.style.filter = 'invert(66%) sepia(79%) saturate(3666%) hue-rotate(132deg) brightness(107%) contrast(91%)';
  }

  navigateTo(page: string): void {
    this.route.navigate([page]);
  }

  displayInfo(): void {
    alert('User menu isn\'t implement, yet!');
  }

  logout(): void{
    this.authService.logout();
    this.route.navigate(['login']);
  }

}
