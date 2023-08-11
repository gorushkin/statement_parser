/* eslint-disable perfectionist/sort-enums */

export enum MANDATORY_FIELD {
  DATE = 'date',
  PAYEE = 'payee',
  MEMO = 'memo',
  INFLOW = 'inflow',
  OUTFLOW = 'outflow',
  AMOUNT = 'amount',
}

export const outputTransaction = Object.values(MANDATORY_FIELD).reduce(
  (acc, field) => ({ ...acc, [field]: '' }),
  {} as Record<MANDATORY_FIELD, string>
);

export const columns = Object.values(MANDATORY_FIELD);
