import { Button } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { convertingState } from 'src/shared/convertingState';

import { preview } from '../../../entities/preview';
const ResetRatesButton = observer(() => {
  const { setWaiting } = convertingState;
  const { resetRates } = preview;

  const handleClick = () => {
    setWaiting();
    resetRates();
  };

  return (
    <Button colorScheme="red" onClick={handleClick}>
      Reset Rates
    </Button>
  );
});

export { ResetRatesButton };
