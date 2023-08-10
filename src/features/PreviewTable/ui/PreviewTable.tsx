import { Tbody } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { preview } from 'src/entities/preview';
import { ITable } from 'src/shared/ui/Table';

import { PreviewHeader } from './PreviewHeader';
import { PreviewRow } from './PreviewRow';

const PreviewTable = observer(() => {
  const { headers, mapping, rows, setMapping } = preview;

  return (
    <ITable>
      <PreviewHeader headers={headers} mapping={mapping} onChange={setMapping} />
      <Tbody>
        {rows.map((row, index) => (
          <PreviewRow key={index} mapping={mapping} row={row} />
        ))}
      </Tbody>
    </ITable>
  );
});

export { PreviewTable };
