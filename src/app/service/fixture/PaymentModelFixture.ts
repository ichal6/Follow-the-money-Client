import {Payment} from '../../model/Payment';
import {getTransportCategory} from "./CategoryModelFixture";

export function getBuyCarPayment(): Payment{
  const payment = new Payment();
  payment.isInternal = false;
  payment.id = 1;
  payment.value = -2500.0;
  payment.date = new Date('2022-05-01T22:00:00.000+00:00');
  payment.title = 'buy car';
  payment.to = 'MERCEDES-BENZ Poland';
  payment.from = 'Savings in sock';
  payment.categoryName = 'transport';
  payment.subcategoryName = getTaxiSubcategoryName();
  payment.balanceAfter = null;

  return payment;
}

function getTaxiSubcategoryName(): string {
  return getTransportCategory().subcategories.find(s => s.id === 10).name;
}

export function getBuyAnotherCarPayment(): Payment{
  const payment = new Payment();
  payment.isInternal = false;
  payment.id = 2;
  payment.value = -2500.0;
  payment.date = new Date('2022-04-20T22:00:00.000+00:00');
  payment.title = 'buy another car';
  payment.to = 'MERCEDES-BENZ Poland';
  payment.from = 'Savings in sock';
  payment.categoryName = 'transport';
  payment.subcategoryName = null;
  payment.balanceAfter = null;

  return payment;
}

export function getCashDepositSeptember(): Payment{
  const payment = new Payment();
  payment.isInternal = true;
  payment.id = 1;
  payment.value = 280.0;
  payment.date = new Date('2022-09-01T22:00:00.000+00:00');
  payment.title = 'Cash deposit september';
  payment.from = 'My Wallet';
  payment.to = 'Millenium';
  payment.categoryName = null;
  payment.balanceAfter = null;

  return payment;
}
