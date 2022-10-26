import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { postCreate, getUserPosts } from '../../slices/postSlice';
import { useResetPostMessage } from '../../hooks/useResetMessage';
import Message from '../../components/Message';

const NewPost = () => {

  const { error, message, loading } = useSelector((state) => state.post);
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
    // console.log(name);

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
    const postFormData = Object.keys(postData).forEach((key) => formData.append(key, postData[key]));

    formData.append('post', postFormData);

    dispatch(postCreate(formData));
    dispatch(getUserPosts());

    setTitle('');
    setDescription('');
    setTags('');
    setImagePost('');

    resetMessage();
    navigate('/dashboard');
  }

  return (
    <Container>
      <Row>
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

          {!loading && <Button variant="primary" type="submit">Publicar</Button>}
          {loading && <Button variant="primary" type="submit" disabled>Aguarde...</Button>}
        </Form>
        {error && <Message type='danger' msg={error} />}
        {message && <Message type='success' msg={message} />}
      </Row>
    </Container>
  )
}

export default NewPost
