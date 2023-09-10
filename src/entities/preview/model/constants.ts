import { Currency } from 'src/shared/types';

import { Column, COLUMN, Currencies } from './types';

export const initCurrencies: Currencies = {
  fromCurrency: Currency.NZD,
  toCurrency: Currency.RUB,
};

export const previewColumns: Column[] = [
  { name: COLUMN.DATE, visible: true },
  { name: COLUMN.PAYEE, visible: true },
  { name: COLUMN.MEMO, visible: true },
  { name: COLUMN.AMOUNT, visible: true },
];

export const initPreviewRecords = previewColumns.reduce(
  (acc, { name }) => ({ ...acc, [name]: '' }),
  {} as Record<COLUMN, string>
);
