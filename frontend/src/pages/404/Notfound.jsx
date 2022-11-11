import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Notfound = () => {
  return (
    <Container className='text-center py-4'>
      <h2 className='display-1'>404</h2>
      <h3 className='pb-3'>Página não encontrada!</h3>
      <Link to='/' className="btn btn-info"><FontAwesomeIcon icon="fa-solid fa-arrow-left" /> Voltar para home</Link>
    </Container>
  )
}

export default Notfound;
