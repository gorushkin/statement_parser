import { Box } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { Currency } from 'src/shared/types';
import { Select } from 'src/shared/ui/Select';

import { preview } from '../..';
import { ConvertDirection } from '../../model/types';

const options = Object.values(Currency);
const fields = Object.values(ConvertDirection);

const labelMapping: Record<ConvertDirection, string> = {
  [ConvertDirection.FROM]: 'From',
  [ConvertDirection.TO]: 'To',
};

const CurrencySelector = observer(() => {
  const { currencies, setCurrencies } = preview;

  const handleChange = (valueStr: string, nameStr: string) => {
    const name = nameStr as ConvertDirection;
    const value = valueStr as Currency;
    setCurrencies({ name, value });
  };

  return (
    <Box display={'flex'} gap={'1rem'}>
      {fields.map((value) => (
        <Select
          key={value}
          label={labelMapping[value]}
          name={value}
          onChange={handleChange}
          options={options}
          value={currencies[value]}
        />
      ))}
    </Box>
  );
});

export { CurrencySelector };
