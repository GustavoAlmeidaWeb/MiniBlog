import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, updateProfile } from '../../slices/userSlice';
import { Container, Row, Form, Button, Col } from 'react-bootstrap';
import { uploads } from '../../utils/config';
import { useResetUserMessage } from '../../hooks/useResetMessage';
import Message from '../../components/Message';

const Profile = () => {

  const { user, loading, message, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const resetMesage = useResetUserMessage(dispatch);

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
    setImageProfile(e.target.files[0]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name,
      password,
      confirmpassword,
    }

    if(imagePreview){
      newUser.imageprofile = imageprofile;
    }

    // Build Form Data
    const formData = new FormData();
    Object.keys(newUser).forEach((key) => formData.append(key, newUser[key]));

    dispatch(updateProfile(formData));

    resetMesage();

    // States Reset
    setImagePreview('');
    setPassword('');
    setConfirmPassword('');

  }

  if(loading) {
    return <p>Carregando...</p>
  }

  return (
    <Container>
      <Col className='d-flex align-items-center justify-content-between py-3 border-bottom'>
        <h2 className='display-5'>Meu Perfil</h2>
      </Col>
      <Row className='py-3'>
      {user.data && (
        <>
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
          {!loading && <Button className="btn btn-info" type="submit">Atualizar Perfil</Button>}
          {loading && <Button className="btn btn-info" type="submit" disabled>Aguarde...</Button>}
        </Form>
        {error && <Message msg={error} type="danger" />}
        {message && <Message msg={message} type="success" />}
        </>
      )}
      </Row>
    </Container>
  )
}

export default Profile
