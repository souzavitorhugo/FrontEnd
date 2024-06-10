import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
  const [usuario, setUsuario] = useState({});

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('usuario'));

    user ? setUsuario(user) : null
  }, [])

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">

          <a className="navbar-brand" href="#">{usuario ? `Bem vindo, ${usuario.name}` : "Sistema Loja"} </a>
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              
              <li className="nav-item">
                <Link to="produtos" className="nav-link" aria-current="page" href="#"> Produtos </Link>
              </li>

              <li className="nav-item">
                <Link to="usuarios" className="nav-link" aria-current="page" href="#"> Usuários </Link>
              </li>

              <li className="nav-item">
                <Link to="servicos" className="nav-link" aria-current="page" href="#"> Serviços </Link>
              </li>
              
            </ul>
            
          </div>
        </div>
      </nav>
    </>
  )
}
