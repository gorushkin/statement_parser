import { Box, Button, Heading } from '@chakra-ui/react';
import { FC } from 'react';

interface StatementPreviewHeaderProps {
  name: string;
  onReset: () => void;
}

const PageHeader: FC<StatementPreviewHeaderProps> = ({ name, onReset }) => (
  <Box alignItems={'center'} display={'flex'}>
    <Heading as="h1" flexGrow={1} textAlign="center">
      {name}
    </Heading>
    <Button onClick={onReset}>Reset</Button>
  </Box>
);

export { PageHeader };
