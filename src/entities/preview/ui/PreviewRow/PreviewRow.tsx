import { Td, Tr } from '@chakra-ui/react';
import { FC } from 'react';
import { Column, InputRecord } from 'src/entities/preview';
interface PreviewRowProps {
  columns: Column[];
  row: InputRecord;
}

const PreviewRow: FC<PreviewRowProps> = ({ columns, row }) => (
  <Tr>
    {columns.map(({ name, visible }) => {
      return visible && <Td key={name}>{row[name]}</Td>;
    })}
  </Tr>
);

export { PreviewRow };
