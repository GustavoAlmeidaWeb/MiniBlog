import { useState, useEffect, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPost } from '../../slices/postSlice';

const Post = () => {

  const { post , error, loading } = useSelector((state) => state.post);
  const post_detail = post.post;
  const comments = post.comments;
  const { id } = useParams();
  const dispatch = useDispatch();

  // Load photo data
  useEffect(() => {
    dispatch(getPost(id));
  }, [id])

  console.log(post_detail);

  // comments.map((cmt) => {
  //   console.log(cmt.comment);
  // })


  return (
    <>
    {!loading && (
      <div>
        <h1>{}</h1>
      </div>
    )}
    </>
  )
}

export default Post
