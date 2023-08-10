import { observer } from 'mobx-react';
import { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { preview } from 'src/entities/preview';
import { PageHeader } from 'src/features/PageHeader';
import { StatementPreviewTable } from 'src/features/PreviewTable';
import { ROUTE } from 'src/shared/routes';

const Preview = observer(() => {
  const { name, reset } = preview;
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!name) navigate(ROUTE.ALL);
  }, [name, navigate]);

  return (
    <>
      <PageHeader name={name} onReset={reset} />
      <StatementPreviewTable />
    </>
  );
});

export { Preview };
