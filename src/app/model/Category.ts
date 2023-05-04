export class Category {
  id: number;
  name: string;
  subcategories: Array<Subcategory>;

  constructor(name?: string) {
    this.name = name;
  }

  static fromHttp(category: Category): Category {
    const newCategory = new Category();
    newCategory.name = category.name;
    newCategory.id = category.id;
    newCategory.subcategories = this.fillSubcategories(category);
    return newCategory;
  }

  private static fillSubcategories(category: Category): Array<Subcategory> {
    const subcategoriesJSON = category.subcategories;
    const subcategoriesTS = new Array<Subcategory>();
    for (const subcategory of subcategoriesJSON) {
      subcategoriesTS.push(Subcategory.fromHttp(subcategory));
    }
    return subcategoriesTS;
  }
}

export class Subcategory {
  id: number;
  name: string;

  static fromHttp(subcategory: Subcategory): Subcategory {
    const newSubcategory = new Subcategory();
    newSubcategory.name = subcategory.name;
    newSubcategory.id = subcategory.id;
    return newSubcategory;
  }
}
