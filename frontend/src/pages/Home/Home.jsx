import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPosts } from '../../slices/postSlice';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Home = () => {

  const { posts, loading, error } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  console.log(localStorage.getItem('miniblog_user'));

  return (
    <div>
      <ul>
      {posts && (
        posts.map((post) => (
          <li key={post.id}>
            <h4>{post.title}</h4>
            {user ? (
              <Link to={`/posts/${post.id}`}>Ver mais</Link>
            ) : (
              <Link to='/login'>Login</Link>
            )}
          </li>
        ))
      )}
      </ul>
    </div>
  )
}

export default Home
