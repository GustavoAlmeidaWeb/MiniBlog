// Images URL
import { uploads } from '../../utils/config';

// Hooks + Router
import { useState, useEffect } from 'react';
import { useResetPostMessage } from '../../hooks/useResetMessage';
import { useParams, Link } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getPost, updatePost } from '../../slices/postSlice';

// Bootstrap + FontAwesome
import { Col, Row, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Components
import Message from '../../components/Message';
import Loading from '../../components/Loading';

const EditPost = () => {

  const { post, loading, error, message } = useSelector((state) => state.post);
  const { id } = useParams();
  const dispatch = useDispatch();
  const resetMessage = useResetPostMessage(dispatch);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [imagepost, setImagePost] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  // Get method post data
  useEffect(() => {

    dispatch(getPost(id));

  }, [dispatch, id]);

  // Load post data on fields
  useEffect(() => {

    if(post !== null){

      setTitle(post.post.title);
      setDescription(post.post.description);
      setTags(post.post.tags);
      setImagePost(post.post.imagepost);

    }

  }, [post]);

  console.log(post);

  const handleSubmit = (e) => {

    e.preventDefault();

    let newPost = {
      title,
      description,
      tags,
    };

    if(imagePreview){
      newPost.imagepost = imagepost;
    }

    // Build Form Data
    const formData = new FormData();
    Object.keys(newPost).forEach((key) => formData.append(key, newPost[key]));

    const sendData = {
      id,
      formData,
    }

    dispatch(updatePost(sendData));

    resetMessage();
  }


  const handleFile = (e) => {

    setImagePreview(URL.createObjectURL(e.target.files[0]));
    setImagePost(e.target.files[0]);

  }

  if(loading) {
    return <Loading />;
  }

  return (
    <>
      <Row className='mb-3'>
        <Col className='d-flex align-items-center justify-content-between py-3 border-bottom'>
          <h2 className='display-5'>Editar Post</h2>
          <div className="action-new-post">
            <Link className='btn btn-info' to='/dashboard'><FontAwesomeIcon icon="fa-solid fa-arrow-left" /> Voltar a Dashboard</Link>
          </div>
        </Col>
      </Row>
      <Row>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Título da Publicação</Form.Label>
            <Form.Control type="text" placeholder="Insira um título para seu post..." onChange={(e) => setTitle(e.target.value)} value={title} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Texto da Publicação</Form.Label>
            <Form.Control as="textarea" rows={3} onChange={(e) => setDescription(e.target.value)} value={description} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tags</Form.Label>
            <Form.Control type="text" placeholder="Separe suas tags com vírgula..." onChange={(e) => setTags(e.target.value)} value={tags} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Imagem do post</Form.Label>
            <Form.Control type="file" onChange={handleFile} />
            <div className="image-preview py-3">
              <h3 className="my-3">Preview imagem do post</h3>
              {imagePreview ? <img src={imagePreview} alt={title} /> : <img src={`${uploads}/posts/${imagepost}`} alt={title} />}
            </div>

          </Form.Group>

          {!loading && <Button variant="info" type="submit">Atualizar Post</Button>}
          {loading && <Button variant="info" type="submit" disabled>Aguarde...</Button>}
          </Form>
        {error && <Message type='danger' msg={error} />}
        {message && <Message type='success' msg={message} />}
      </Row>
    </>
  )
}

export default EditPost;
