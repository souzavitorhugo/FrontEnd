import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import Products from './routes/Products.jsx';
import Login from './routes/Login.jsx';
import Users from './routes/Users.jsx';
import Services from './routes/Services.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '/produtos',
        element: <Products/>
      },
       {
        path: '/usuarios',
        element: <Users/>
      },
      {
        path: '/servicos',
        element: <Services/>
      }
    ]
  }, {
    path: '/login',
    element: <Login/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
