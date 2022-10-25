import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../../slices/userSlice';

const Profile = () => {

  const { user, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  console.log(user);

  if(loading) {
    return <p>Carregando...</p>
  }

  return (
    <div>Profile</div>
  )
}

export default Profile
