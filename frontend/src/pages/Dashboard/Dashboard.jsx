import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserPosts } from '../../slices/postSlice';
import { Link } from 'react-router-dom';

const Dashboard = () => {

  const { posts, loading } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserPosts())
  }, [dispatch]);

  const handleDelete = () => {

  }

  if(loading) {
    return <p>Carregando...</p>
  }

  console.log(posts);

  return (
    <div>
      {posts && posts.map((post) => (
        <>
          <div key={post.id}>
            <h4>{post.title}</h4>
            <div className="actions">
              <Link to={`/posts/edit/${post.id}`}>Editar</Link>
              <button onClick={handleDelete}>Excluir</button>
            </div>
          </div>
        </>
      ))}
    </div>
  )
}

export default Dashboard
