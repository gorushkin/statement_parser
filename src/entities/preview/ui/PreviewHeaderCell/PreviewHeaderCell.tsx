import { Box, Th } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { Select } from 'src/shared/ui/Select';

import { COLUMN } from '../../model/types';

interface PreviewHeaderCellProps {
  headers: string[];
  name: COLUMN;
  onChange: (name: string, value: string) => void;
  visible: boolean;
}

const PreviewHeaderCell: FC<PreviewHeaderCellProps> = ({
  headers,
  name,
  onChange,
  visible,
}) => {
  const [value, setValue] = useState<string>('');

  const handleChange = (value: string) => {
    setValue(value);
    onChange(name, value);
  };

  if (!visible) return null;

  const options = ['', ...headers];

  return (
    <Th>
      <Box>
        <Select
          label={name}
          onChange={handleChange}
          options={options}
          value={value}
          vertical
        />
      </Box>
    </Th>
  );
};

export { PreviewHeaderCell };
