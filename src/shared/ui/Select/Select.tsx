import { Box, Select as ChakraSelect } from '@chakra-ui/react';
import { ChangeEvent, FC } from 'react';

import { horizontalStyles, verticalStyles } from './styles';

interface SelectProps {
  label?: string;
  name?: string;
  onChange: (value: string, name: string) => void;
  options: string[];
  value?: string;
  vertical?: boolean;
}

const Select: FC<SelectProps> = ({
  label,
  name,
  onChange,
  options,
  value,
  vertical = false,
}) => {
  const handleCHange = ({
    target: { value },
  }: ChangeEvent<HTMLSelectElement>) => {
    onChange(value, name ?? '');
  };

  const styles = vertical ? verticalStyles : horizontalStyles;

  return (
    <Box alignItems={'center'} {...styles.wrapper}>
      {label && <Box {...styles.label}>{label}</Box>}
      <ChakraSelect
        minW={'100px'}
        name="currentCurrency"
        onChange={handleCHange}
        value={value}
      >
        {options.map((value) => (
          <option key={value} value={value}>
            {value.toUpperCase()}
          </option>
        ))}
      </ChakraSelect>
    </Box>
  );
};

export { Select };
