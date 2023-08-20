import { Currency } from '../types';

type GetRatesResponse = Record<Currency, string>;

type GetRates = (date: Date) => Promise<GetRatesResponse>;

// TODO: send not one date but list

export const getRates: GetRates = async (date) => {
  const pref = date.toString();
  const response: GetRatesResponse = {
    nzd: `nzd_${pref}`,
    rub: `rub_${pref}`,
    try: `try_${pref}`,
    usd: `usd_${pref}`,
  };

  return Promise.resolve(response);
};
