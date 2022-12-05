import { uploads } from '../../utils/config';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserPosts, deletePost } from '../../slices/postSlice';
import { Link } from 'react-router-dom';
import { Col, Row, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useResetPostMessage } from '../../hooks/useResetMessage';
import Message from '../../components/Message';
import Loading from '../../components/Loading';

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
    return <Loading />;
  }


  return (
    <>
      <Col className='d-flex align-items-center justify-content-between py-3 border-bottom'>
        <h2 className='display-5'>Dashboard</h2>
        <div className="action-new-post">
          <Link className='btn btn-info' to='/posts/create'><FontAwesomeIcon icon="fa-solid fa-file-pen" /> Novo post</Link>
        </div>
      </Col>
      {posts && (
        <>
          {posts.length > 0 ? (
          <>
            {posts.map((post) => (
              <Row key={post.id} className="py-3 border-bottom">
                <Col xl={2} md={2} sm={2} xs={2}>
                  <img src={`${uploads}/posts/${post.imagepost}`} alt={post.title} />
                </Col>
                <Col xl={7} md={7} sm={7} xs={7}>
                  <h4 className='h4'><Link className='text-decoration-none link-dark' to={`/posts/${post.id}`}>{post.title}</Link></h4>
                  <p>Publicado: {new Date(post.createdAt).toLocaleDateString()}</p>
                </Col>
                <Col xl={3} md={3} sm={3} xs={3} className="d-flex justify-content-end align-self-center">
                  <OverlayTrigger placement="top" overlay={<Tooltip>Editar Post</Tooltip>}>
                    <Link className="btn btn-info mx-2" to={`/posts/edit/${post.id}`}><FontAwesomeIcon icon="fa-solid fa-pencil" /></Link>
                  </OverlayTrigger>
                  <OverlayTrigger placement="top" overlay={<Tooltip>Excluir Post</Tooltip>}>
                    <button className="btn btn-danger" onClick={() => handleDelete(post.id)}><FontAwesomeIcon icon="fa-solid fa-trash-can" /></button>
                  </OverlayTrigger>
                </Col>
              </Row>
            ))}
          </>
          ) : (
          <Col className='py-4 text-center'>
            <h3 className='h5'>Nenhuma publicação por aqui, crie seu primeiro post...</h3>
          </Col>
          )}
        </>
      )}
      {message && <Message msg={message} type='success' />}
      {error && <Message msg={error} type='danger' />}
    </>
  )
}

export default Dashboard;
