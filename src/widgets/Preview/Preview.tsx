import { Box } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { Navigate,  } from 'react-router-dom';
import { preview, PreviewStatement } from 'src/entities/preview';
import { OriginalStatement } from 'src/features/OriginalStatement';
import { PageHeader } from 'src/features/PageHeader';
import { ROUTE } from 'src/shared/routes';

const Preview = observer(() => {
  const { name, resetPreview, saveStatement } = preview;

  if (!name) return <Navigate replace to={ROUTE.ROOT} />;

  return (
    <>
      <Box mb={'1rem'}>
        <PageHeader name={name} onReset={resetPreview} onSave={saveStatement} />
      </Box>
      <Box mb={'1rem'}>
        <PreviewStatement />
      </Box>
      <Box>
        <OriginalStatement />
      </Box>
    </>
  );
});

export { Preview };
