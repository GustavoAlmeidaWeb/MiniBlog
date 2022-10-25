import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';

import { Container } from 'react-bootstrap';

import { useAuth } from './hooks/useAuth';
import { useSelector } from 'react-redux';

// Components
import NavBar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home/Home';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Post from './pages/Post/Post';
import Dashboard from './pages/Dashboard/Dashboard';
import Profile from './pages/Profile/Profile';
import Notfound from './pages/404/Notfound';
import EditPost from './pages/EditPost/EditPost';


function App() {

  const { user } = useSelector((state) => state.auth);
  const { auth, loading } = useAuth();

  if(loading) {
    return <p>Carregando....</p>
  }

  return (
    <Container fluid className="App">
      <NavBar />
      <Container>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/posts/:id' element={auth ? <Post /> : <Navigate to='/login'/>} />
          <Route path='/posts/edit/:id' element={auth ? <EditPost /> : <Navigate to='/login'/>} />
          <Route path='/dashboard' element={auth ? <Dashboard /> : <Navigate to='/login'/>} />
          <Route path='/my-profile' element={auth ? <Profile /> : <Navigate to='/login'/>} />
          <Route path='/register' element={!auth ? <Register /> : <Navigate to='/'/>} />
          <Route path='/login' element={!auth ? <Login /> : <Navigate to='/'/>} />
          <Route path='/logout' element={<Navigate to='/login' />} />
          <Route path='*' element={<Notfound />} />
        </Routes>
      </Container>
      <Footer />
    </Container>
  )
}

export default App
