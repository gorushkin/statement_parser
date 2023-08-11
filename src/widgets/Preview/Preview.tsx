import { Box } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { Navigate,  } from 'react-router-dom';
import { preview, PreviewTable } from 'src/entities/preview';
import { InputStatement } from 'src/features/InputStatement';
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
        <PreviewTable />
      </Box>
      <Box>
        <InputStatement />
      </Box>
    </>
  );
});

export { Preview };
