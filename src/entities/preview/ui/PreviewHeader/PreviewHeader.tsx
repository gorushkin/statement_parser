import { Thead, Tr } from '@chakra-ui/react';
import { observer } from 'mobx-react';

import { preview } from '../..';
import { PreviewHeaderCell } from '../PreviewHeaderCell';

const PreviewHeader = observer(() => {
  const { columns, headers, updatePreview } = preview;

  return (
    <Thead>
      <Tr>
        {columns.map(({ name, visible }) => (
          <PreviewHeaderCell
            headers={headers}
            key={name}
            name={name}
            onChange={updatePreview}
            visible={visible}
          />
        ))}
      </Tr>
    </Thead>
  );
});

export { PreviewHeader };
