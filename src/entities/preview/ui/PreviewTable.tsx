import { Box, Tbody } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { preview } from 'src/entities/preview';
import { ITable } from 'src/shared/ui/Table';

import { PreviewHeader } from './PreviewHeader';
import { PreviewRow } from './PreviewRow';
import { SwitchFormatButton } from './SwitchFormatButton';

const PreviewTable = observer(() => {
  const {
    columns,
    headers,
    nextColumnFormat,
    toggleColumnsFormat,
    transactions,
    updatePreview,
  } = preview;

  return (
    <Box>
      <Box display={'flex'} justifyContent={'flex-end'} mb={'1rem'}>
        <SwitchFormatButton
          nextColumnFormat={nextColumnFormat}
          onToggleFormat={toggleColumnsFormat}
        />
      </Box>
      <ITable>
        <PreviewHeader
          columns={columns}
          headers={headers}
          onChange={updatePreview}
        />
        <Tbody>
          {transactions.map((row, index) => (
            <PreviewRow columns={columns} key={index} row={row} />
          ))}
        </Tbody>
      </ITable>
    </Box>
  );
});

export { PreviewTable };
