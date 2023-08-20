import { COLUMN } from '..';
import { ColumnFormat } from '../constants';
import { Currencies, Currency } from './types';

export const conditionMapping: Record<
  ColumnFormat,
  (column: COLUMN) => boolean
> = {
  [ColumnFormat.AMOUNT]: (column) =>
    column !== COLUMN.OUTFLOW && column !== COLUMN.INFLOW,
  [ColumnFormat.INOUT]: (column) => column !== COLUMN.AMOUNT,
};

export const columnFormatMap = {
  [ColumnFormat.AMOUNT]: ColumnFormat.INOUT,
  [ColumnFormat.INOUT]: ColumnFormat.AMOUNT,
};

export const initCurrencies: Currencies = {
  fromCurrency: Currency.NZD,
  toCurrency: Currency.RUB,
};
