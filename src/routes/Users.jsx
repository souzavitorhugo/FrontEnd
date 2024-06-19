import { useState, useEffect } from 'react'

import UsuariosTable from '../components/Usuarios/UsuariosTable';

export default function users() {
    const [usuarios, setUsuarios] = useState([]);

    const url = 'http://localhost:3000/users';

    useEffect(() => {
        // Lista todos os produtos:
        const getUsersList = async() => {
            const res = await fetch(url);
            const data = await res.json();

            setUsuarios(data);
        }

        getUsersList();

    }, []);

    return (
        <>
            <h2>Usuários</h2>
            <div>
                {
                    usuarios.length > 0 ? <UsuariosTable usuarios={usuarios} setUsuarios={setUsuarios}/> : <h3 style={{marginBottom: '30px'}}>Nenhum Usuário cadastrado...</h3>
                }
            </div>
        </>
    )
}