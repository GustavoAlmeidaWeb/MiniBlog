import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Postcard = ({ auth, post, uploads }) => {
  return (
    <Card className="text-center my-3" key={post.id}>
      <Card.Header>
        <Card.Img variant="top" src={`${uploads}/posts/${post.imagepost}`} />
      </Card.Header>
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text><FontAwesomeIcon icon="fa-solid fa-pen-nib" /> <i>Publicado por <strong><Link className="link-dark text-decoration-none" to={`/user/${post.User.id}`}>{post.User.name}</Link></strong></i></Card.Text>
        {auth ? (
          <Link className='btn btn-info' to={`/posts/${post.id}`}><FontAwesomeIcon icon="fa-solid fa-plus" /> Ver mais</Link>
        ) : (
          <Link className='btn btn-info' to='/login'><FontAwesomeIcon icon="fa-solid fa-arrow-right-to-bracket" /> Login</Link>
        )}
      </Card.Body>
      <Card.Footer className="text-muted">
        <FontAwesomeIcon icon="fa-solid fa-calendar-days" /> {new Date(post.createdAt).toLocaleDateString('pt-BR', { dateStyle: 'short' })} às <FontAwesomeIcon icon="fa-regular fa-clock" /> {new Date(post.createdAt).toLocaleTimeString('pt-BR', { timeStyle: 'short' })}
      </Card.Footer>
    </Card>
  )
}

export default Postcard;
