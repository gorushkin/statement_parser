import { Container } from '@chakra-ui/react';
import { Preview } from 'src/widgets/Preview';

import styles from './PreviewPage.module.scss';

const PreviewPage = () => (
  <Container className={styles.container} maxW={'100%'}>
    <Preview />
  </Container>
);

export { PreviewPage };
