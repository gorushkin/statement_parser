import {
  Select as ChakraSelect,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { ChangeEvent, FC } from 'react';

interface SelectProps {
  label?: string;
  name?: string;
  onChange: (value: string, name: string) => void;
  options: string[];
  value?: string;
}

const Select: FC<SelectProps> = ({ label, name, onChange, options, value }) => {
  const handleCHange = ({
    target: { value },
  }: ChangeEvent<HTMLSelectElement>) => {
    onChange(value, name || '');
  };

  return (
    <FormControl alignItems={'center'} display={'flex'}>
      {label && <FormLabel mb={0}>{label}</FormLabel>}
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
    </FormControl>
  );
};

export { Select };
