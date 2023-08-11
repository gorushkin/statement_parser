import { Container } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { Preview } from 'src/widgets/Preview';

const PreviewPage = () => {
  const location = useLocation();
  console.log('location: ', location);
  return (
    <Container maxW={'100%'}>
      <Preview />
    </Container>
  );
};

export { PreviewPage };
