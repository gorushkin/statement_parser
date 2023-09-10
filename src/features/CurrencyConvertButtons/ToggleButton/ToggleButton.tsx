import { Button } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { convertingState } from 'src/shared/convertingState';

import { preview } from '../../../entities/preview';

const ToggleButton = observer(() => {
  const { isConvertingEnabled, resetRates, toggleConverting } = preview;
  const { setWaiting, state } = convertingState;

  const buttonText = isConvertingEnabled.value ? 'x' : 'Convert';

  const handleClick = () => {
    toggleConverting();
    if (state === 'ready') {
      setWaiting();
      resetRates();
    }
  };

  return (
    <Button colorScheme="messenger" onClick={handleClick}>
      {buttonText}
    </Button>
  );
});

export { ToggleButton };
