import { Currency } from '../types';

type GetRatesResponse = Record<Currency, string>;

type GetRates = (date: Date | null) => Promise<GetRatesResponse>;

// TODO: send not one date but list

export const getRates: GetRates = async (date) => {
  const response: GetRatesResponse = {
    nzd: date ? '25' : '',
    rub: date ? '25' : '',
    try: date ? '25' : '',
    usd: date ? '25' : '',
  };

  return Promise.resolve(response);
};
