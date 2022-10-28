import { useState, useEffect } from 'react';
import { Container, Row, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPost, updatePost } from '../../slices/postSlice';
import { uploads } from '../../utils/config';
import { useResetPostMessage } from '../../hooks/useResetMessage';
import Message from '../../components/Message';

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

    if(post.post){

      setTitle(post.post.title);
      setDescription(post.post.description);
      setTags(post.post.tags);
      setImagePost(post.post.imagepost);

    } else {

      setTitle(post.title);
      setDescription(post.description);
      setTags(post.tags);
      setImagePost(post.imagepost);

    }
  }, [post]);

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
    // dispatch(getPost(id));

    resetMessage();
  }


  const handleFile = (e) => {

    setImagePreview(URL.createObjectURL(e.target.files[0]));
    setImagePost(e.target.files[0]);

  }

  if(loading) {
    return <p>Carregando...</p>
  }

  return (
    <Container>
      <Row>
        {/* {!loading && post && <> */}
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

        {!loading && <Button variant="primary" type="submit">Atualizar Post</Button>}
        {loading && <Button variant="primary" type="submit" disabled>Aguarde...</Button>}
        </Form>
        {error && <Message type='danger' msg={error} />}
        {message && <Message type='success' msg={message} />}
        {/* </>} */}
      </Row>
    </Container>
  )
}

export default EditPost
