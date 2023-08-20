import { Button } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { convertingState } from 'src/shared/convertingState';

import { preview } from '../../../entities/preview';

const SaveRatesButton = observer(() => {
  const { setWaiting } = convertingState;
  const { saveRates } = preview;

  const handleClick = () => {
    setWaiting();
    saveRates();
  };

  return (
    <Button colorScheme="green" onClick={handleClick}>
      Save Rates
    </Button>
  );
});

export { SaveRatesButton };
