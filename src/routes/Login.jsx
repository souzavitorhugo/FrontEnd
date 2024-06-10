import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const url = 'http://localhost:3000/users';
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const logUser = async (e) => {
    e.preventDefault();

    const res = await fetch(url + `/${senha}`);
    const data = await res.json();
    
    window.localStorage.setItem('usuario', JSON.stringify(data));
    navigate('/');
  }

  const handleEmail = (e) => {setEmail(e.target.value)};
  const handleSenha = (e) => {setSenha(e.target.value)};

  return (
    <div className='container'>
    <h2>Login</h2>
    <form onSubmit={(e) => logUser(e)}>
        {/* <label className='form-label' htmlFor="email">Email:</label>
        <input className='form-input' value={email} type="email" name="email" onChange={(e) => handleEmail(e)} required/> */}

        <label className='form-label' htmlFor="senha">Id User:</label>
        <input className='form-input' value={senha} type="password" name="senha" onChange={(e) => handleSenha(e)} required/>
        <input className='form-submit' type="submit" value="Entrar" />
    </form>
  </div>
)
}
