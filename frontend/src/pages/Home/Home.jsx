import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPosts } from '../../slices/postSlice';
import { Link } from 'react-router-dom';
import { Card, Container } from 'react-bootstrap';
import { uploads } from '../../utils/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Home = ({ auth }) => {

  const { posts, loading, error } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  if(loading) {
    return <p>Carregando...</p>;
  }

  console.log(posts);

  return (
    <Container>
      {posts && (
        posts.map((post) => (
        <Card className="text-center my-3" key={post.id}>
          <Card.Header>
            <Card.Img variant="top" src={`${uploads}/posts/${post.imagepost}`} />
          </Card.Header>
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text><FontAwesomeIcon icon="fa-solid fa-pen-nib" /> <i>Publicado por <strong>{post.User.name}</strong></i></Card.Text>
            {auth ? (
              <Link className='btn btn-info' to={`/posts/${post.id}`}>Ver mais</Link>
            ) : (
              <Link className='btn btn-info' to='/login'>Login</Link>
            )}
          </Card.Body>
          <Card.Footer className="text-muted">
            <FontAwesomeIcon icon="fa-solid fa-calendar-days" /> {new Date(post.createdAt).toLocaleDateString('pt-BR', { dateStyle: 'short' })} às <FontAwesomeIcon icon="fa-regular fa-clock" /> {new Date(post.createdAt).toLocaleTimeString('pt-BR', { timeStyle: 'short' })}
          </Card.Footer>
        </Card>
        ))
      )}
    </Container>
  )
}

export default Home;
