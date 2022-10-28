import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../../slices/userSlice';
import { Container, Row, Form, Button } from 'react-bootstrap';
import { uploads } from '../../utils/config';

const Profile = () => {

  const { user, loading, message, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [imageprofile, setImageProfile] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {

    dispatch(getProfile());

  }, [dispatch]);

  useEffect(() => {

    if(user.data) {
      setName(user.data.name);
      setEmail(user.data.email);
      setImageProfile(user.data.imageprofile);
    }

  }, [user.data])

  console.log(user);

  const handleFile = (e) => {
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name,
      password,
      confirmpassword,
    }

  }

  if(loading) {
    return <p>Carregando...</p>
  }

  return (
    <Container>
      <Row>
      {user.data && (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            {imageprofile ? (
              <><img src={`${uploads}/users/${imageprofile}`} alt={name} className='mb-3' /></>
            ) : (
              <><h2 className='h4 mb-3'>Nenhuma imagem de perfil :(</h2></>
            )}
            {imagePreview && <img src={imagePreview} alt='Imagem Preview' />}

            <Form.Control type='file' onChange={handleFile} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nome</Form.Label>
            <Form.Control type="text" onChange={(e) => setName(e.target.value)} value={name || ''} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>E-mail</Form.Label>
            <Form.Control type="email" value={email || ''} disabled />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Senha</Form.Label>
            <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} value={password || ''} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirme a Senha</Form.Label>
            <Form.Control type="password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmpassword || ''} />
          </Form.Group>
          {!loading && <Button className="btn btn-primary" type="submit">Atualizar Perfil</Button>}
          {loading && <Button className="btn btn-primary" type="submit" disabled>Aguarde...</Button>}
        </Form>
      )}
      </Row>
    </Container>
  )
}

export default Profile
