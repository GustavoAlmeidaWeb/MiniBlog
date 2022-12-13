import { Container, Row } from 'react-bootstrap';

const Footer = () => {
  return (
    <Container fluid className="bg-dark py-5">
      <Row>
        <p className='text-light text-center'>{new Date().getFullYear()} &copy; Miniblog. Todos os direitos reservados.</p>
      </Row>
    </Container>
  )
}

export default Footer;
