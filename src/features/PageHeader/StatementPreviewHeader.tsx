import { Box, Button, Heading } from '@chakra-ui/react';
import { FC } from 'react';

interface StatementPreviewHeaderProps {
  name: string;
  onReset: () => void;
  onSave: () => void;
}

const PageHeader: FC<StatementPreviewHeaderProps> = ({
  name,
  onReset,
  onSave,
}) => (
  <Box alignItems={'center'} display={'flex'}>
    <Heading
      as="h1"
      flexGrow={1}
      overflow={'hidden'}
      textAlign="center"
      textOverflow={'ellipsis'}
      title={name}
      whiteSpace={'nowrap'}
    >
      {name}
    </Heading>
    <Box flexShrink={0}>
      <Button mr={'1rem'} onClick={onReset}>
        Reset
      </Button>
      <Button
        backgroundColor={'green.400'}
        onClick={onSave}
        variant={'outline'}
      >
        Save
      </Button>
    </Box>
  </Box>
);

export { PageHeader };
