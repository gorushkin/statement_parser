import { Box } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { preview } from 'src/entities/preview';
import { PageHeader } from 'src/features/PageHeader';
import { PreviewSaveButton } from 'src/features/PreviewSaveButton';
import { PreviewTable } from 'src/features/PreviewTable';
import { ROUTE } from 'src/shared/routes';

const Preview = observer(() => {
  const { name, reset, saveStatement } = preview;
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!name) navigate(ROUTE.ALL);
  }, [name, navigate]);

  return (
    <>
      <Box mb={'1rem'}>
        <PageHeader name={name} onReset={reset} />
      </Box>
      <Box mb={'1rem'}>
        <PreviewTable />
      </Box>
      <PreviewSaveButton onSave={saveStatement} />
    </>
  );
});

export { Preview };
