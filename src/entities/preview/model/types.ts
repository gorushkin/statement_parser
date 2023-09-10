import { Currency } from 'src/shared/types';

/* eslint-disable perfectionist/sort-enums */
export type Header = string;
export type StatementRecord = { [x: string]: string };

export enum COLUMN {
  DATE = 'date',
  PAYEE = 'payee',
  MEMO = 'memo',
  AMOUNT = 'amount',
}

export type PreviewRecord = Record<COLUMN, string>;

export type Column = { name: COLUMN; visible: boolean };

export enum ConvertDirection {
  FROM = 'fromCurrency',
  TO = 'toCurrency',
}

export type Currencies = Record<ConvertDirection, Currency>;
