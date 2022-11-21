import { Container, Spinner } from 'react-bootstrap';

const Loading = () => {
  return (
    <Container className='text-center py-4'>
      <Spinner animation="border" />
    </Container>
  )
}

export default Loading;
