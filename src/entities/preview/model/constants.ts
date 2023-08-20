import { Column, COLUMN, Currencies, Currency } from './types';

export const initCurrencies: Currencies = {
  fromCurrency: Currency.NZD,
  toCurrency: Currency.RUB,
};

export const previewColumns: Column[] = [
  { name: COLUMN.DATE, visible: true },
  { name: COLUMN.PAYEE, visible: true },
  { name: COLUMN.MEMO, visible: true },
  { name: COLUMN.AMOUNT, visible: true },
  { name: COLUMN.ORIGINAL_AMOUNT, visible: false },
];

export const initPreviewRecords = previewColumns
  .filter(({ visible }) => !!visible)
  .reduce(
    (acc, { name }) => ({ ...acc, [name]: '' }),
    {} as Record<COLUMN, string>
  );
