import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, FloatingLabel, Button } from 'react-bootstrap';
import { register } from '../../slices/authSlice';

const Register = () => {

  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmpassword,
    }

    dispatch(register(user));
  }

  return (
    <Container>
      <Row>
        <div className="text-center mb-4">
          <h2 className='display-4 mb-3'>Faça seu cadastro</h2>
          <p>Realize seu cadastro e comece a postar suas fotos...</p>
        </div>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit} className="mb-3">
            <FloatingLabel controlId="floatingInput" label="Seu nome" className="mb-3 text-dark" >
              <Form.Control type="text" placeholder="Seu nome" onChange={(e) => setName(e.target.value)} value={name || ''} />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Seu e-mail" className="mb-3 text-dark" >
              <Form.Control type="email" placeholder="Seu e-mail" onChange={(e) => setEmail(e.target.value)} value={email || ''} />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Senha" className="mb-3 text-dark" >
              <Form.Control type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} value={password || ''} />
            </FloatingLabel>
            <FloatingLabel controlId="floatingConfirmPassword" label="Confimar Senha" className="mb-3 text-dark" >
              <Form.Control type="password" placeholder="Confimar Senha" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmpassword || ''} />
            </FloatingLabel>
            <Form.Label className="d-grid">
              {!loading && <Button type="submit" size="lg" variant="primary">Cadastrar</Button>}
              {loading && <Button type="submit" size="lg" variant="primary" disabled>Aguarde...</Button>}
              {error && <Message msg={error} type='danger'/>}
            </Form.Label>
          </Form>
          <p className="text-center">Já tem conta ?  <Link to="/login">Clique Aqui</Link></p>
        </Col>
      </Row>
    </Container>
  )
}

export default Register
