import {Transfer} from '../../model/Transfer';

export function getCashDepositSeptember(): Transfer{
  const transfer = new Transfer();
  transfer.id = 1;
  transfer.value = 280.0;
  transfer.date = '2022-09-01T22:00'
  transfer.title = 'Cash deposit september';
  transfer.accountIdFrom = 1;
  transfer.accountIdTo = 2;

  return transfer;
}
