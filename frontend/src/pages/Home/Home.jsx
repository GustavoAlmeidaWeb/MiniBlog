import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPosts } from '../../slices/postSlice';

const Home = () => {

  const { posts, loading, error } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  console.log(posts);
  return (
    <div>Home</div>
  )
}

export default Home
