import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';

import { Container } from 'react-bootstrap';

import { useAuth } from './hooks/useAuth';

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
import NewPost from './pages/NewPost/NewPost';


function App() {

  const { auth, loading } = useAuth();

  if(loading) {
    return <p>Carregando....</p>
  }

  return (
    <>
      <NavBar />
      <Container fluid className="App py-4">
        <Container>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/posts/:id' element={auth ? <Post /> : <Navigate to='/login'/>} />
            <Route path='/posts/edit/:id' element={auth ? <EditPost /> : <Navigate to='/login'/>} />
            <Route path='/posts/create' element={auth ? <NewPost /> : <Navigate to='/login'/>} />
            <Route path='/dashboard' element={auth ? <Dashboard /> : <Navigate to='/login'/>} />
            <Route path='/my-profile' element={auth ? <Profile /> : <Navigate to='/login'/>} />
            <Route path='/register' element={!auth ? <Register /> : <Navigate to='/'/>} />
            <Route path='/login' element={!auth ? <Login /> : <Navigate to='/'/>} />
            <Route path='/logout' element={<Navigate to='/' />} />
            <Route path='*' element={<Notfound />} />
          </Routes>
        </Container>
      </Container>
      <Footer />
    </>
  )
}

export default App
