// Images URL
import { uploads } from '../../utils/config';

// Hooks + Router
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResetUserMessage } from '../../hooks/useResetMessage';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, updateProfile, deleteProfile } from '../../slices/userSlice';

// Bootstrap + FontAwesome
import { Container, Row, Form, Button, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Components
import Message from '../../components/Message';
import Loading from '../../components/Loading';

const Profile = () => {

  const { user, loading, message, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const resetMesage = useResetUserMessage(dispatch);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [imageprofile, setImageProfile] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [imageTemp, setImageTemp] = useState('');

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

  const handleFile = (e) => {
    setImagePreview(URL.createObjectURL(e.target.files[0]));
    setImageTemp(e.target.files[0]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name,
      password,
      confirmpassword,
    }

    if(imagePreview){
      newUser.imageprofile = imageTemp;
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

  // Delete your account
  const handleDelete = () => {

    dispatch(deleteProfile());
    navigate('/login');

  }

  if(loading) {
    return <Loading />;
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
          <Form.Group className="mb-3 text-center">
            {!imagePreview ? (
                imageprofile ? (
                  <img src={`${uploads}/users/${imageprofile}`} alt={name} className='mb-3 w-25 rounded-circle' />
                ) : (
                  <h4 className="h5 my-3">Nenhuma foto de perfil cadastrada...</h4>
                )
              ) : (
                <img src={imagePreview} alt='Imagem Preview' className='mb-3 w-25 rounded-circle' />
            )}
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
          {!loading && (
            <Form.Group className="d-flex justify-content-between">
              <Button className="btn btn-info" type="submit"><FontAwesomeIcon icon="fa-solid fa-pen-to-square" /> Atualizar Perfil</Button>
              <Button className="btn btn-danger" type="button" onClick={handleDelete}><FontAwesomeIcon icon="fa-solid fa-trash-can" /> Excluir Conta</Button>
            </Form.Group>
          )}
          {loading && <Button className="btn btn-info" type="submit" disabled><FontAwesomeIcon icon="fa-regular fa-hourglass" /> Aguarde...</Button>}
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
