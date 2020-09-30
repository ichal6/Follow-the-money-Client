export class Category{
  id: number;
  name: string;
  type: GeneralType;
  subcategories: Array<Subcategory>;
}

export enum GeneralType{
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE'
}

export class Subcategory{
  id: number;
  name: string;
  type: GeneralType;
}
