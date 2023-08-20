import { COLUMN } from '../constants';

export type Header = string;
export type StatementRecord = { [x: string]: string };
export type Transaction = Record<COLUMN, string>;
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
