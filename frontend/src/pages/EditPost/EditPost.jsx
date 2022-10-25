import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPost } from '../../slices/postSlice';

const EditPost = () => {

  const { post, loading, error } = useSelector((state) => state.post);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch, id]);

  console.log(post);

  if(loading) {
    return <p>Carregando...</p>
  }

  return (
    <div>EditPost</div>
  )
}

export default EditPost
