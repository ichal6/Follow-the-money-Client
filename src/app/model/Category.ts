import {Account, AccountType} from './Account';

export class Category{
  id: number;
  name: string;
  type: GeneralType;
  subcategories: Array<Subcategory>;

  constructor(name?: string, type?: GeneralType) {
    this.name = name;
    this.type = type;
  }

  static fromHttp(category: Category): Category {
    const newCategory = new Category();
    newCategory.name = category.name;
    newCategory.id = category.id;
    newCategory.type = (category.type === GeneralType.INCOME) ? GeneralType.INCOME : GeneralType.EXPENSE;
    newCategory.subcategories = this.fillSubcategories(category);
    return newCategory;
  }

  private static fillSubcategories(category: Category): Array<Subcategory>{
    const subcategoriesJSON = category.subcategories;
    const subcategoriesTS = new Array<Subcategory>();
    for (const subcategory of subcategoriesJSON){
      subcategoriesTS.push(Subcategory.fromHttp(subcategory));
    }
    return subcategoriesTS;
  }
}

export enum GeneralType{
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE'
}

export class Subcategory{
  id: number;
  name: string;
  type: GeneralType;

  static fromHttp(subcategory: Subcategory): Subcategory {
    const newSubcategory = new Subcategory();
    newSubcategory.name = subcategory.name;
    newSubcategory.id = subcategory.id;
    newSubcategory.type = (subcategory.type === GeneralType.INCOME) ? GeneralType.INCOME : GeneralType.EXPENSE;
    return newSubcategory;
  }
}
