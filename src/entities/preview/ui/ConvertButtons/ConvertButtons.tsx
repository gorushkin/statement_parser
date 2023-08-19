import { Box, Button } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { Select } from 'src/shared/Select';

import { preview } from '../..';
import { ConvertDirection, Currency } from '../../model/types';

const options = Object.values(Currency);
const fields = Object.values(ConvertDirection);

const labelMapping: Record<ConvertDirection, string> = {
  [ConvertDirection.FROM]: 'From',
  [ConvertDirection.TO]: 'To',
};

const ConvertButtons = observer(() => {
  const { currencies, isConvertingEnabled, setCurrencies, toggleConverting } =
    preview;

  const buttonText = isConvertingEnabled ? 'x' : 'Convert';

  const handleChange = (valueStr: string, nameStr: string) => {
    const name = nameStr as ConvertDirection;
    const value = valueStr as Currency;
    setCurrencies({ name, value });
  };

  return (
    <>
      {isConvertingEnabled && (
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
      )}
      <Button colorScheme="messenger" onClick={toggleConverting}>
        {buttonText}
      </Button>
    </>
  );
});

export { ConvertButtons };
