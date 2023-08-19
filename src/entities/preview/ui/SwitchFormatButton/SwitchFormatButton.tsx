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
    <Button colorScheme="orange" onClick={onToggleFormat}>
      Switch Format to {nextColumnFormat}
    </Button>
  );
};

export { SwitchFormatButton };
