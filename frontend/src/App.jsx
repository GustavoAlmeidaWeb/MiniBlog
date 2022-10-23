import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { api } from './utils/config';

import { Container } from 'react-bootstrap';

// Components
import NavBar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home/Home';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';


function App() {

  const [result, setResult] = useState();

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
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Container>
      <Footer />
    </Container>
  )
}

export default App
