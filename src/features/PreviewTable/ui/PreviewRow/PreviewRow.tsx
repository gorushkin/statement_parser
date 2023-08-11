import { Td, Tr } from '@chakra-ui/react';
import { FC } from 'react';
import { Transaction } from 'src/entities/preview';
import { MANDATORY_FIELD } from 'src/entities/preview/constants';

interface PreviewRowProps {
  columns: MANDATORY_FIELD[];
  row: Transaction;
}

const PreviewRow: FC<PreviewRowProps> = ({ columns, row }) => (
  <Tr>
    {columns.map((value, index) => (
      <Td key={index}>{row[value]}</Td>
    ))}
  </Tr>
);

export { PreviewRow };
