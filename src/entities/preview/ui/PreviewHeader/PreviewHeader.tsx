import { Thead, Tr } from '@chakra-ui/react';
import { FC } from 'react';
import { COLUMN } from 'src/entities/preview/';

import { PreviewHeaderCell } from '../PreviewHeaderCell';

interface PreviewHeaderProps {
  columns: COLUMN[];
  headers: string[];
  onChange: (name: string, value: string) => void;
}

const PreviewHeader: FC<PreviewHeaderProps> = ({
  columns,
  headers,
  onChange,
}) => (
  <Thead>
    <Tr>
      {columns.map((item, i) => (
        <PreviewHeaderCell
          headers={headers}
          key={i}
          name={item}
          onChange={onChange}
        />
      ))}
    </Tr>
  </Thead>
);

export { PreviewHeader };
