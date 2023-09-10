import { Settings } from './types';

export enum BANK {
  VAKIF = 'VAKIF',
}

export const SETTINGS: Record<BANK, Settings> = {
  [BANK.VAKIF]: {
    headers: {
      end: 7,
      start: 6,
    },
    rows: {
      end: -6,
      start: 7,
    },
  },
};
