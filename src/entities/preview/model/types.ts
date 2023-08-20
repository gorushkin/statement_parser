/* eslint-disable perfectionist/sort-enums */
export type Header = string;
export type StatementRecord = { [x: string]: string };

export enum COLUMN {
  DATE = 'date',
  PAYEE = 'payee',
  MEMO = 'memo',
  AMOUNT = 'amount',
  ORIGINAL_AMOUNT = 'originalAmount',
}

export type PreviewRecord = Record<COLUMN, string>;

export type Column = { name: COLUMN; visible: boolean };

export enum Currency {
  NZD = 'nzd',
  RUB = 'rub',
  TRY = 'try',
  USD = 'usd',
}

export enum ConvertDirection {
  FROM = 'fromCurrency',
  TO = 'toCurrency',
}

export type Currencies = Record<ConvertDirection, Currency>;
