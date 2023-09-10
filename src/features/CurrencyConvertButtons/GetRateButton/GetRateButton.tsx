import { Button } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { convertingState } from 'src/shared/convertingState';

import { preview } from '../../../entities/preview';

const GetRateButton = observer(() => {
  const { updateRates } = preview;
  const { setReady } = convertingState;

  const handleClick = async () => {
    await updateRates();
    setReady();
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <Button colorScheme="green" onClick={handleClick}>
      Update Rates
    </Button>
  );
});

export { GetRateButton };
