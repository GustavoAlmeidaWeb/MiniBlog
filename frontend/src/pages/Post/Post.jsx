import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPost, commentCreate } from '../../slices/postSlice';
import { Container, Form, Button } from 'react-bootstrap';
import { useResetPostMessage } from '../../hooks/useResetMessage';
import Message from '../../components/Message';
import Loading from '../../components/Loading';

const Post = () => {

  const { post, loading, error, message } = useSelector((state) => state.post);
  const { id } = useParams();
  const dispatch = useDispatch();
  const resetMessage = useResetPostMessage(dispatch);

  const [comment, setComment] = useState('');

  // Load post data
  useEffect(() => {

    dispatch(getPost(id));

  }, [dispatch, id]);

  useEffect(() => {

    if(message) {
      dispatch(getPost(id));
      setComment('');
    }

  },[message]);

  const handleSubmit = (e) => {

    e.preventDefault();

    const commentData = {
      id,
      comment,
    }

    dispatch(commentCreate(commentData));
    resetMessage();

  }

  if(loading) {
    return <Loading />;
  }

  return (
    <Container>
      <div>
        {post && (
          <>
            <h1>{post.post.title}</h1>
            <h5>Autor: {post.post.User.name}</h5>
            <p>{post.post.description}</p>
            <div>
              <h3 className='my-3'>{post.comments.length} Comentário(s)</h3>
              {post.comments.length > 0 ? (
                <ul>
                  {post.comments.map((cmt) => (
                    <li key={cmt.id}>
                      <p>{cmt.comment}</p>
                      <p>por: <strong>{cmt.User.name}</strong></p>
                    </li>
                  ))}
                </ul>
              ) : (
                <>
                  <h4>Nenhum comentário encontrado</h4>
                </>
              )}
            </div>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Fazer comentário</Form.Label>
                <Form.Control as="textarea" rows={3} onChange={(e) => setComment(e.target.value)} value={comment || ''} />
              </Form.Group>
              <Button variant="info" type="submit">Enviar</Button>
            </Form>
            {error && <Message msg={error} type="danger" />}
            {message && <Message msg={message} type="success" />}
          </>
        )}
      </div>
    </Container>
  )
}

export default Post;
