import { Box } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { convertingState } from 'src/shared/convertingState';

import { preview } from '../../entities/preview';
import { CurrencySelector } from '../../entities/preview/ui/CurrencySelector';
import { GetRateButton } from './GetRateButton';
import { ResetRatesButton } from './ResetRatesButton';
import { SaveRatesButton } from './SaveRatesButton';
import { ToggleButton } from './ToggleButton';

const ConvertButtons = observer(() => {
  const { isConvertingEnabled } = preview;
  const { state } = convertingState;

  return (
    <>
      {isConvertingEnabled.value && (
        <Box display={'flex'} gap={'1rem'}>
          <CurrencySelector />
          {state === 'waiting' && <GetRateButton />}
          {state === 'ready' && <SaveRatesButton />}
          {state === 'ready' && <ResetRatesButton />}
        </Box>
      )}
      <ToggleButton />
    </>
  );
});

export { ConvertButtons };
