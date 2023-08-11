/* eslint-disable perfectionist/sort-enums */

export enum COLUMN {
  DATE = 'date',
  PAYEE = 'payee',
  MEMO = 'memo',
  INFLOW = 'inflow',
  OUTFLOW = 'outflow',
  AMOUNT = 'amount',
}

export enum ColumnFormat {
  AMOUNT = 'Amount',
  INOUT = 'Inflow/Outflow',
}

export const transaction = Object.values(COLUMN).reduce(
  (acc, field) => ({ ...acc, [field]: '' }),
  {} as Record<COLUMN, string>
);

export const columns = Object.values(COLUMN);
