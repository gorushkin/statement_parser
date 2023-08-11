import { Button } from '@chakra-ui/react';
import { FC } from 'react';

import { ColumnFormat } from '../../constants';

interface SwitchFormatButtonProps {
  nextColumnFormat: ColumnFormat;
  onToggleFormat: () => void;
}

const SwitchFormatButton: FC<SwitchFormatButtonProps> = ({
  nextColumnFormat,
  onToggleFormat,
}) => {
  return (
    <Button background={'orange.300'} onClick={onToggleFormat}>
      Switch Format to {nextColumnFormat}
    </Button>
  );
};

export { SwitchFormatButton };
