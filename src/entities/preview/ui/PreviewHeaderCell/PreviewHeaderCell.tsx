import { Box, Select, Th } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { COLUMN } from 'src/entities/preview';

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

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    onChange(name, e.target.value);
  };

  if (!visible) return null;

  return (
    <Th>
      <Box>{name}</Box>
      <Box>
        <Select name={name} onChange={handleChange} value={value}>
          {['', ...headers].map((header, i) => (
            <option key={i} value={header}>
              {header}
            </option>
          ))}
        </Select>
      </Box>
    </Th>
  );
};

export { PreviewHeaderCell };
