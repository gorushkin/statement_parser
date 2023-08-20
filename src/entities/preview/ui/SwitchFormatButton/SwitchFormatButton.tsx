import { Button } from '@chakra-ui/react';
import { observer } from 'mobx-react';

import { preview } from '../..';

const SwitchFormatButton = observer(() => {
  const { nextColumnFormat, toggleColumnsFormat } = preview;

  return (
    <Button colorScheme="orange" onClick={toggleColumnsFormat}>
      Switch Format to {nextColumnFormat}
    </Button>
  );
});

export { SwitchFormatButton };
