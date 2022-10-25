import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPost } from '../../slices/postSlice';

const Post = () => {

  const { post , error, loading } = useSelector((state) => state.post);
  // const { user } = useSelector((state) => state.auth);
  const { id } = useParams();
  const dispatch = useDispatch();

  // Load photo data
  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch, id])

  if(loading) {
    return <p>Carregando...</p>
  }

  console.log(post);

  // comments.map((cmt) => {
  //   console.log(cmt.comment);
  // })


  return (
    <>
    {!loading && (
      <div>
        {post && (
          <>
            <h1>{post.post.title}</h1>
            <p>{post.post.description}</p>
          </>
        )}
      </div>
    )}
    </>
  )
}

export default Post
