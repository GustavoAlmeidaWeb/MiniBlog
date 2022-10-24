import { useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';

// Redux
import { logout, resetAuthStates } from '../slices/authSlice';

const NavBar = () => {

  const { auth } = useAuth();
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());

    navigate('/');
  }

  return (
    <div>
      <ul>
        <li>
          <NavLink to='/'>Home</NavLink>
          {!auth ? (
            <>
              <NavLink to='/register'>Cadastrar-se</NavLink>
              <NavLink to='/login'>Login</NavLink>
            </>
          ) : (
            <>
              <NavLink to='/posts/4'>Teste</NavLink>
              <NavLink to='/logout' onClick={handleLogout}>Sair</NavLink>
            </>
          )}
        </li>
      </ul>
    </div>
  )
}

export default NavBar
