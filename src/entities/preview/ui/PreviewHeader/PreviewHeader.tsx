import { Thead, Tr } from '@chakra-ui/react';
import { FC } from 'react';
import { Column } from 'src/entities/preview/';

import { PreviewHeaderCell } from '../PreviewHeaderCell';

interface PreviewHeaderProps {
  columns: Column[];
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
      {columns.map(({ name, visible }) => (
        <PreviewHeaderCell
          headers={headers}
          key={name}
          name={name}
          onChange={onChange}
          visible={visible}
        />
      ))}
    </Tr>
  </Thead>
);
export { PreviewHeader };
