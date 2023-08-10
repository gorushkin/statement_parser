import { Td, Tr } from '@chakra-ui/react';
import { FC } from 'react';
import { Transaction } from 'src/entities/preview';
import { MANDATORY_FIELD } from 'src/entities/preview/constants';

interface PreviewRowProps {
  mapping: Record<MANDATORY_FIELD, string>;
  row: Transaction;
}

const PreviewRow: FC<PreviewRowProps> = (props) => {
  const { mapping, row } = props;

  return (
    <Tr>
      {Object.values(mapping).map((value, index) => {
        return <Td key={index}>{row[value]}</Td>;
      })}
    </Tr>
  );
};

export { PreviewRow };
