import { Tbody } from '@chakra-ui/react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { preview } from 'src/entities/preview';
import { ITable } from 'src/shared/ui/Table';

import { PreviewHeader } from './PreviewHeader';
import { PreviewRow } from './PreviewRow';

const PreviewTable = observer(() => {
  const { columns, headers, outputTransactions, updatePreview } = preview;

  return (
    <ITable>
      <PreviewHeader columns={columns} headers={headers} onChange={updatePreview} />
      <Tbody>
        {outputTransactions.map((row, index) => (
          <PreviewRow columns={columns} key={index} row={row} />
        ))}
      </Tbody>
    </ITable>
  );
});

export { PreviewTable };
