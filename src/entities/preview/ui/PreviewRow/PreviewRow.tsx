import { Td, Tr } from '@chakra-ui/react';
import { FC } from 'react';
import { Column, StatementRecord } from 'src/entities/preview';
interface PreviewRowProps {
  columns: Column[];
  row: StatementRecord;
}

const PreviewRow: FC<PreviewRowProps> = ({ columns, row }) => (
  <Tr>
    {columns.map(({ name, visible }) => {
      return visible && <Td key={name}>{row[name]}</Td>;
    })}
  </Tr>
);

export { PreviewRow };
