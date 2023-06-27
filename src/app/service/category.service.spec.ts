import { TestBed } from '@angular/core/testing';

import { CategoryService } from './category.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {createSpyFromClass, Spy} from 'jasmine-auto-spies';
import {data} from './fixture/CategoryJSONFixture';
import * as CategoryModelFixture from './fixture/CategoryModelFixture';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {DataService} from './data.service';


describe('CategoryService', () => {
  let service: CategoryService;
  let httpSpy: Spy<HttpClient>;

  const categoryObjects = [
    CategoryModelFixture.getBonusesCategory(),
    CategoryModelFixture.getFoodCategory(),
    CategoryModelFixture.getTransportCategory()
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule, HttpClientTestingModule
      ],
      providers: [
        CategoryService,
        {
          provide: HttpClient,
          useValue: createSpyFromClass(HttpClient)
        }
      ]
    });
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryService);
    httpSpy = TestBed.inject(HttpClient) as Spy<HttpClient>;
    const email = "example@company.com";
    spyOn(DataService.prototype, 'getEmail').and.returnValue(email);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sort category by name when income from server', (done: DoneFn) => {
    httpSpy.get.and.nextWith(data);

    service.getAllCategories().subscribe({
      next: categories => {
        expect(categories.length).toEqual(data.length);
        expect(categories).toEqual(categoryObjects);
        done();
      },
      error: done.fail
    });
    expect(httpSpy.get.calls.count()).toBe(1);
  })
});
