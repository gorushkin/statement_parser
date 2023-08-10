import { Thead, Tr } from '@chakra-ui/react';
import { FC } from 'react';

import { MANDATORY_FIELD } from '../../../../entities/preview/constants';
import { PreviewHeaderCell } from '../PreviewHeaderCell';

interface PreviewHeaderProps {
  headers: string[];
  mapping: Record<MANDATORY_FIELD, string>;
  onChange: (name: string, value: string) => void;
}

const PreviewHeader: FC<PreviewHeaderProps> = ({ headers, mapping, onChange }) => {
  return (
    <Thead>
      <Tr>
        {Object.keys(mapping).map((item, i) => (
          <PreviewHeaderCell headers={headers} key={i} name={item as MANDATORY_FIELD} onChange={onChange} />
        ))}
      </Tr>
    </Thead>
  );
};

export { PreviewHeader };
