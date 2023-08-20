import { Tbody } from '@chakra-ui/react';
import { observer } from 'mobx-react';

import { preview } from '../..';
import { PreviewRow } from '../PreviewRow';

const PreviewBody = observer(() => {
  const { columns, previewRecords } = preview;

  return (
    <Tbody>
      {previewRecords.map((row, index) => (
        <PreviewRow columns={columns} key={index} row={row} />
      ))}
    </Tbody>
  );
});

export { PreviewBody };
