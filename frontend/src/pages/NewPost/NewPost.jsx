import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Form, Button, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, Link } from 'react-router-dom';
import { postCreate, getUserPosts, getPost } from '../../slices/postSlice';
import { useResetPostMessage } from '../../hooks/useResetMessage';
import Message from '../../components/Message';

const NewPost = () => {

  const { post, error, message, loading } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const resetMessage = useResetPostMessage(dispatch);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [imagepost, setImagePost] = useState('');

  const handleFile = (e) => {

    const img = e.target.files[0];
    setImagePost(img);

  }

  const handleSubmit = (e) => {

    e.preventDefault();

    const postData = {
      title,
      description,
      tags,
      imagepost,
    }

    // Build Form Data
    const formData = new FormData();
    Object.keys(postData).forEach((key) => formData.append(key, postData[key]));

    dispatch(postCreate(formData));

    resetMessage();

  }

  useEffect(() => {

    if(message) {
      setTitle('');
      setDescription('');
      setTags('');
      setImagePost('');

      dispatch(getUserPosts());
      dispatch(getPost(post.post.id));

      setTimeout(() => {
        navigate('/dashboard')
      }, 2000)

    }
  }, [message]);

  return (
    <Container>
      <Col className='d-flex align-items-center justify-content-between py-3 border-bottom'>
        <h2 className='display-5'>Novo Post</h2>
        <div className="action-new-post">
          <Link className='btn btn-info' to='/dashboard'><FontAwesomeIcon icon="fa-solid fa-arrow-left" /> Voltar a Dashboard</Link>
        </div>
      </Col>
      <Row className='py-3'>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Título da Publicação</Form.Label>
            <Form.Control type="text" placeholder="Insira um título para seu post..." onChange={(e) => setTitle(e.target.value)} value={title || ''} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Texto da Publicação</Form.Label>
            <Form.Control as="textarea" rows={3} onChange={(e) => setDescription(e.target.value)} value={description || ''} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tags</Form.Label>
            <Form.Control type="text" placeholder="Separe suas tags com vírgula..." onChange={(e) => setTags(e.target.value)} value={tags || ''} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Imagem do post</Form.Label>
            <Form.Control type="file" onChange={handleFile} />
          </Form.Group>

          {!loading && <Button variant="info" type="submit">Publicar</Button>}
          {loading && <Button variant="info" type="submit" disabled>Aguarde...</Button>}
        </Form>
        {error && <Message type='danger' msg={error} />}
        {message && <Message type='success' msg={message} />}
      </Row>
    </Container>
  )
}

export default NewPost
