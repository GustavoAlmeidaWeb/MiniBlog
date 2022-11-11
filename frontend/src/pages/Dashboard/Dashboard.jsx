import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserPosts, deletePost } from '../../slices/postSlice';
import { Link } from 'react-router-dom';
import { Container, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useResetPostMessage } from '../../hooks/useResetMessage';
import Message from '../../components/Message';

const Dashboard = () => {

  const { posts, loading, error, message } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const resetMessage = useResetPostMessage(dispatch);

  useEffect(() => {

    dispatch(getUserPosts());
    console.log('dispatch dashboard...')

  }, [dispatch]);

  const handleDelete = async (id) => {

    await dispatch(deletePost(id));
    dispatch(getUserPosts());
    resetMessage();

  }

  if(loading) {
    return <p>Carregando...</p>
  }


  return (
    <Container>
      <Col className='d-flex align-items-center justify-content-between py-3 border-bottom'>
        <h2 className='display-5'>Dashboard</h2>
        <div className="action-new-post">
          <Link className='btn btn-info' to='/posts/create'><FontAwesomeIcon icon="fa-solid fa-file-pen" /> Novo post</Link>
        </div>
      </Col>
      {posts && (
        <ul>
          {posts.length > 0 ? (
          <>
            {posts.map((post) => (
              <li key={post.id}>
                <h4>{post.title}</h4>
                <div className="actions">
                  <Link to={`/posts/edit/${post.id}`}>Editar</Link>
                  <button onClick={() => handleDelete(post.id)}>Excluir</button>
                </div>
              </li>
            ))}
          </>
          ) : (
          <Col className='py-4 text-center'>
            <h3 className='h5'>Nenhuma publicação por aqui, crie seu primeiro post...</h3>
          </Col>
          )}
        </ul>
      )}
      {message && <Message msg={message} type='success' />}
      {error && <Message msg={error} type='danger' />}
    </Container>
  )
}

export default Dashboard
