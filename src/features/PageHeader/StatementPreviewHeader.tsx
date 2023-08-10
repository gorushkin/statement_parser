import { Button, Heading } from '@chakra-ui/react';
import { FC } from 'react';

import styles from './PageHeader.module.scss';

interface StatementPreviewHeaderProps {
  name: string;
  onReset: () => void;
}

const PageHeader: FC<StatementPreviewHeaderProps> = ({ name, onReset }) => {
  return (
    <div className={styles.container}>
      <Heading as="h1" className={styles.title} mb="5" textAlign="center">
        {name}
      </Heading>
      <Button onClick={onReset}>Reset</Button>
    </div>
  );
};

export { PageHeader };
