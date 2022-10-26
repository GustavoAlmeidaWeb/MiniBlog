import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserPosts, deletePost } from '../../slices/postSlice';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useResetPostMessage } from '../../hooks/useResetMessage';
import Message from '../../components/Message';

const Dashboard = () => {

  const { posts, loading, error, message } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const resetMessage = useResetPostMessage(dispatch);

  useEffect(() => {

    dispatch(getUserPosts());

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
      <div>
        <Link to='/posts/create'>Novo post</Link>
      </div>
      {posts && (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h4>{post.title}</h4>
              <div className="actions">
                <Link to={`/posts/edit/${post.id}`}>Editar</Link>
                <button onClick={() => handleDelete(post.id)}>Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {message && <Message msg={message} type='success' />}
      {error && <Message msg={error} type='danger' />}
    </Container>
  )
}

export default Dashboard
