// URLS
import { uploads } from '../../utils/config';

// Hooks
import { useEffect } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../../slices/postSlice';

// Components
import Loading from '../../components/Loading';
import Postcard from '../../components/Postcard';

const Home = ({ auth }) => {

  const { posts, loading } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(getAllPosts());

  },[dispatch]);

  if(loading || !posts || !posts[0].User) {
    return <Loading />;
  }

  return (
    <>
      {posts && (
        posts.map((post) => (
        <Postcard auth={auth} post={post} uploads={uploads} key={post.id} />
        ))
      )}
    </>
  )
}

export default Home;
