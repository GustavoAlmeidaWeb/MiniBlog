// URL
import { uploads } from '../../utils/config';

// Hooks e Router
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { searchPosts } from '../../slices/postSlice';

// Components
import Loading from '../../components/Loading';
import Postcard from '../../components/Postcard';

const Search = ({ auth }) => {

  const { posts, loading } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  useEffect(() => {
    dispatch(searchPosts(query));
  }, [query])

  if(loading) {
    return <Loading />;
  }

  return (
    <>
    {posts && posts.length > 0 ? (
      <>
      <h2 className='display-6'>{posts.length} resultado(s) encontrados para a busca: "{query}"</h2>
      {posts.map((post) => (
        <Postcard auth={auth} post={post} uploads={uploads} key={post.id} />
      ))}
      </>
    ) : (
      <h2 className='display-6'>Nenhum resultado para a busca: "{query}"</h2>
    )}
    </>
  )
}

export default Search;
