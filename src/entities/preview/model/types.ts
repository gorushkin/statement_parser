import { COLUMN } from '../constants';

export type Header = string;
export type InputRecord = { [x: string]: string };
export type Transaction = Record<COLUMN, string>;
export type Column = { name: COLUMN; visible: boolean };