import { Tbody } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { useState } from 'react';
import { preview } from 'src/entities/preview';
import { ITable } from 'src/shared/ui/Table';

import { MANDATORY_FIELD } from '../../../entities/preview/constants';
import { PreviewHeader } from './PreviewHeader';
import { PreviewRow } from './PreviewRow';

const mandatoryFields = Object.keys(MANDATORY_FIELD);

const initState = mandatoryFields.reduce(
  (acc, field) => ({ ...acc, [field]: '' }),
  {} as Record<MANDATORY_FIELD, string>
);

const PreviewTable = observer(() => {
  const { headers, rows } = preview;

  const [mapping, setMapping] = useState<Record<MANDATORY_FIELD, string>>(initState);

  const handleChange = (name: string, value: string) => {
    setMapping((state) => ({ ...state, [name]: value }));
  };

  return (
    <ITable>
      <PreviewHeader headers={headers} mapping={mapping} onChange={handleChange} />
      <Tbody>
        {rows.map((row, index) => (
          <PreviewRow key={index} mapping={mapping} row={row} />
        ))}
      </Tbody>
    </ITable>
  );
});

export { PreviewTable };
