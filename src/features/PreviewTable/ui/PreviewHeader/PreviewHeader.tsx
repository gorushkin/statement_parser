import { Thead, Tr } from '@chakra-ui/react';
import { FC } from 'react';

import { MANDATORY_FIELD } from '../../../../entities/preview/constants';
import { PreviewHeaderCell } from '../PreviewHeaderCell';

interface PreviewHeaderProps {
  columns: MANDATORY_FIELD[];
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
