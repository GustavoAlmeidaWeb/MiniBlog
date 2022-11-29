import { uploads } from '../../utils/config';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getPost, commentCreate } from '../../slices/postSlice';
import { useResetPostMessage } from '../../hooks/useResetMessage';
import { Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

  if(loading || !post || !post.post.User) {
    return <Loading />;
  }

  return (
    <>
      {post && (
        <>
          <img src={`${uploads}/posts/${post.post.imagepost}`} alt={post.post.title} />
          <h1 className='mt-4 display-5'>{post.post.title}</h1>
          <p className='text-muted fs-6 fst-italic'><FontAwesomeIcon icon="fa-regular fa-user" /> Autor: {post.post.User.name} - <FontAwesomeIcon icon="fa-regular fa-calendar-check" /> Postado em {new Date(post.post.createdAt).toLocaleDateString()} às <FontAwesomeIcon icon="fa-regular fa-clock" /> {new Date(post.post.createdAt).toLocaleTimeString('pt-BR',{ timeStyle: 'short'})}</p>
          <p className='border-bottom pb-3'>{post.post.description}</p>
          <div>
            <h3 className='my-3 h5'><FontAwesomeIcon icon="fa-regular fa-comments" /> {post.comments.length} Comentário(s)</h3>
            {post.comments.length > 0 ? (
              <>
                {post.comments.map((cmt) => (
                  <div className='d-flex py-3' key={cmt.id}>
                    <div className='w-25 px-4'>
                      {cmt.User.imageprofile ? (
                        <img className='rounded-circle' src={`${uploads}/users/${cmt.User.imageprofile}`} alt={cmt.User.name} />
                      ) : (
                        <img className='rounded-circle' src={`${uploads}/users/no-profile-image.svg`} alt={cmt.User.name} />
                      )}
                    </div>
                    <div className='w-75'>
                      <p>{cmt.comment}</p>
                      <p className='text-muted fst-italic'>por: {cmt.User.name}</p>
                    </div>
                  </div>

                ))}
              </>
            ) : (
              <>
                <p className='fs-6 text-secondary'>Nenhum comentário encontrado</p>
              </>
            )}
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className='fw-bold'>Escrever comentário</Form.Label>
              <Form.Control as="textarea" rows={3} onChange={(e) => setComment(e.target.value)} value={comment || ''} />
            </Form.Group>
            <Button variant="info" type="submit">Enviar</Button>
          </Form>
          {error && <Message msg={error} type="danger" />}
          {message && <Message msg={message} type="success" />}
        </>
      )}
    </>
  )
}

export default Post;
