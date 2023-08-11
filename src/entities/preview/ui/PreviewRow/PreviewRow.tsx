import { Td, Tr } from '@chakra-ui/react';
import { FC } from 'react';
import { COLUMN, InputRecord } from 'src/entities/preview';
interface PreviewRowProps {
  columns: COLUMN[];
  row: InputRecord;
}

const PreviewRow: FC<PreviewRowProps> = ({ columns, row }) => (
  <Tr>
    {columns.map((value, index) => (
      <Td key={index}>{row[value]}</Td>
    ))}
  </Tr>
);

export { PreviewRow };
