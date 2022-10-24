import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { api } from './utils/config';

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


function App() {

  const [result, setResult] = useState();
  const { user } = useSelector((state) => state.auth);
  const { auth } = useAuth();

  const getData = async (url) => {

    const res = await fetch(url);
    const data = await res.json();

    setResult(data);
    console.log(data);

  }

  useEffect(() => {

    const url = `${api}/posts`;
    getData(url);

  }, [])

  return (
    <Container fluid className="App">
      <NavBar />
      <Container>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/posts/:id' element={auth ? <Post /> : <Navigate to='/login'/>} />
          <Route path='/register' element={!auth ? <Register /> : <Navigate to='/'/>} />
          <Route path='/login' element={!auth ? <Login /> : <Navigate to='/'/>} />
          <Route path='/logout' element={<Navigate to='/' />} />
        </Routes>
      </Container>
      <Footer />
    </Container>
  )
}

export default App
