import {Category, Subcategory} from '../../model/Category';

export function getTransportCategory(): Category{
  const category = new Category();
  category.id = 5;
  category.name = 'Transport';
  category.subcategories = [getTaxiSubcategory()];

  return category;
}

export function getTaxiSubcategory(): Subcategory {
  const subcategory = new Subcategory();
  subcategory.id = 10;
  subcategory.name = 'Taxi';

  return subcategory;
}

export function getBonusesCategory(): Category{
  const category = new Category();
  category.id = 4;
  category.name = 'Bonuses';
  category.subcategories = [];

  return category;
}

export function getFoodCategory(): Category{
  const category = new Category();
  category.id = 2;
  category.name = 'Food';
  category.subcategories = [];

  return category;
}
