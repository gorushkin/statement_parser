import { Box, Heading, Tbody } from '@chakra-ui/react';
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
      <Box display={'flex'} justifyContent={'space-between'} mb={'1rem'}>
        <Heading as="h1" mb={'1rem'} size="lg">
          Preview Statement
        </Heading>
        <Box>
          <SwitchFormatButton
            nextColumnFormat={nextColumnFormat}
            onToggleFormat={toggleColumnsFormat}
          />
        </Box>
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
