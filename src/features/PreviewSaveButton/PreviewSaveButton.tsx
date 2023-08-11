import { Box, Button } from '@chakra-ui/react';
import { FC } from 'react';

interface PreviewSaveButtonProps {
  onSave: () => void;
}

const PreviewSaveButton: FC<PreviewSaveButtonProps> = ({ onSave }) => {
  return (
    <Box display={'flex'} justifyContent={'flex-end'}>
      <Button
        backgroundColor={'green.400'}
        onClick={onSave}
        variant={'outline'}
      >
        Save
      </Button>
    </Box>
  );
};

export { PreviewSaveButton };
