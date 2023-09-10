import { Box, Button, Heading } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { preview } from 'src/entities/preview';
import { ExportButton } from 'src/shared/ExportButton';

const PageHeader = observer(() => {
  const {
    CSV: { file },
    name,
    resetPreview,
    saveStatement,
  } = preview;

  return (
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
      <Box display={'flex'} flexShrink={0} gap={'0.5rem'}>
        <Button colorScheme="orange" onClick={resetPreview}>
          Reset
        </Button>
        <Button colorScheme="green" onClick={saveStatement}>
          Save
        </Button>
        <ExportButton file={file} name={name} />
      </Box>
    </Box>
  );
});

export { PageHeader };
