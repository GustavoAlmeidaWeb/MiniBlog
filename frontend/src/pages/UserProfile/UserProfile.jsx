import { uploads } from '../../utils/config';
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserPostsById } from '../../slices/postSlice';
import { getProfileById } from '../../slices/userSlice';
import { Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loading from '../../components/Loading';

const UserProfile = () => {

  const { posts, loading } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.user);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(getUserPostsById(id));
    dispatch(getProfileById(id));

  }, [dispatch]);

  if(loading) {
    return <Loading />;
  }

  return (
    <>
    {user && posts && (
      <Row className="d-flex align-items-center mb-3">
        <div className="w-25">
          {user.imageprofile ? (
            <img className="rounded-circle" src={`${uploads}/users/${user.imageprofile}`} alt={user.name} />
            ) : (
            <img className="rounded-circle" src={`${uploads}/users/no-profile-image.svg`} alt={user.name} />
          )}
        </div>
        <div className="w-75">
          <h2 className="display-6">{user.name}</h2>
          <p>{posts.length} artigo(s) publicado(s).</p>
        </div>
      </Row>
    )}
    {posts && posts.map((post) => (
      <Card className="text-center mb-4" key={post.id}>
        <Card.Header>
          <Card.Img variant="top" src={`${uploads}/posts/${post.imagepost}`} />
        </Card.Header>
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>Clique no botão abaixo para ler mais sobre esse artigo.</Card.Text>
          <Link className='btn btn-info' to={`/posts/${post.id}`}><FontAwesomeIcon icon="fa-solid fa-glasses" /> Ler artigo</Link>
        </Card.Body>
        <Card.Footer className="text-muted">
          Publicado em <FontAwesomeIcon icon="fa-solid fa-calendar-days" /> {new Date(post.createdAt).toLocaleDateString('pt-BR', { dateStyle: 'short' })} às <FontAwesomeIcon icon="fa-regular fa-clock" /> {new Date(post.createdAt).toLocaleTimeString('pt-BR', { timeStyle: 'short' })}
        </Card.Footer>
      </Card>
    ))}
    </>
  )
}

export default UserProfile;
