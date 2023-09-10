import { Button } from '@chakra-ui/react';
import { FC } from 'react';

interface ExportButtonProps {
  file: string;
  name: string;
}

export const ExportButton: FC<ExportButtonProps> = ({ file, name }) => {
  const handleCLick = () => {
    const blob = new Blob([file], { type: 'text/csv' });
    const a = document.createElement('a');
    a.download = `${name}.csv`;
    a.href = URL.createObjectURL(blob);
    a.addEventListener('click', () => {
      setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
    });
    a.click();
  };

  return (
    <Button colorScheme="blue" onClick={handleCLick}>
      Export
    </Button>
  );
};
