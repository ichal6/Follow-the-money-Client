import {Payee} from '../../model/Payee';

export function getBiedronkaPayee(): Payee{
  const payee = new Payee();
  payee.id = 3;
  payee.name = 'Biedronka';

  return payee;
}

export function getJobPayee(): Payee{
  const payee = new Payee();
  payee.id = 1;
  payee.name = 'Job';

  return payee;
}

export function getKomisPayee(): Payee{
  const payee = new Payee();
  payee.id = 4;
  payee.name = 'Mariusz-trans komis';

  return payee;
}
