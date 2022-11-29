// Hooks + Router
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Redux
import { useDispatch } from 'react-redux';
import { logout, resetAuthStates } from '../slices/authSlice';

// Bootstrap + FontAwesome
import { Navbar, Container, Nav, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NavBar = () => {

  const { auth } = useAuth();
  const [query, setQuery] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reset = resetAuthStates();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
  }

  const handleSearch = (e) => {
    e.preventDefault();

    if(query) {
      navigate(`/search?q=${query}`);
    }
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <NavLink className="navbar-brand" to="/">Miniblog</NavLink>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '200px' }} navbarScroll>
            <NavLink className="nav-link" to='/'><FontAwesomeIcon icon="fa-solid fa-house" /> Home</NavLink>
            {!auth ? (
              <>
                <NavLink className="nav-link" to='/register'><FontAwesomeIcon icon="fa-solid fa-file-circle-plus" /> Cadastrar-se</NavLink>
                <NavLink className="nav-link" to='/login'><FontAwesomeIcon icon="fa-solid fa-right-to-bracket" /> Login</NavLink>
              </>
            ) : (
              <>
                <NavLink className="nav-link" to='/dashboard'><FontAwesomeIcon icon="fa-solid fa-gauge" /> Dashboard</NavLink>
                <NavLink className="nav-link" to='/my-profile'><FontAwesomeIcon icon="fa-solid fa-id-card-clip" /> Meu perfil</NavLink>
                <NavLink className="nav-link" to='/logout' onClick={handleLogout}><FontAwesomeIcon icon="fa-solid fa-right-from-bracket" /> Sair</NavLink>
              </>
            )}
          </Nav>
          <Form className="d-flex" onSubmit={handleSearch}>
            <Form.Control type="search" placeholder="Buscar..." className="me-2" aria-label="Search" onChange={(e) => setQuery(e.target.value)}/>
            <Button type="submit" variant="info"><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /></Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar;
