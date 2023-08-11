import { Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { preview } from 'src/entities/preview';
import { ITable } from 'src/shared/ui/Table';

const InputStatement = observer(() => {
  const { headers, inputRecords } = preview;

  return (
    <ITable>
      <Thead>
        <Tr>
          {headers.map((item, cellIndex) => (
            <Th key={cellIndex}>{item}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {inputRecords.map((row, rowIndex) => (
          <Tr key={rowIndex}>
            {Object.values(row).map((cell, cellIndex) => (
              <Td key={cellIndex}>{cell}</Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </ITable>
  );
});

export { InputStatement };
