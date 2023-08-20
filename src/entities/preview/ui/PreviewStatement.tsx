import { Box, Heading } from '@chakra-ui/react';
import { ITable } from 'src/shared/ui/Table';

import { ConvertButtons } from './ConvertButtons';
import { PreviewBody } from './PreviewBody';
import { PreviewHeader } from './PreviewHeader';

const PreviewStatement = () => (
  <Box>
    <Box display={'flex'} justifyContent={'space-between'} mb={'1rem'}>
      <Heading as="h1" mb={'1rem'} size="lg">
        Preview Statement
      </Heading>
      <Box
        alignItems={'center'}
        display={'flex'}
        gap={'1rem'}
        justifyContent={'flex-end'}
      >
        <ConvertButtons />
      </Box>
    </Box>
    <ITable>
      <PreviewHeader />
      <PreviewBody />
    </ITable>
  </Box>
);

export { PreviewStatement };
