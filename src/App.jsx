import { useState, useEffect } from 'react'
import { Outlet, useNavigate, useLocation  } from 'react-router-dom';
import './App.css'

import Login from './routes/Login.jsx';
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';

// CRUD COM JSON SERVER

function App() {
  const url = 'http://localhost:3000/users';
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {

    const user = JSON.parse(window.localStorage.getItem('usuario'));

    if(!user) {
      return navigate("/login")
    }

    if(location.pathname === '/') navigate("/produtos");
  }, [])

  return (
    <> 
      <NavBar/>

      <div className='root'>
        <Outlet/>
      </div>

      <Footer/> 
    </> 
  );

}

export default App
