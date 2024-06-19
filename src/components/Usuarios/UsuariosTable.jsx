import UsuariosForm from "./UsuariosForm";
import { useState, useEffect } from 'react'

export default function UsuariosTable({usuarios, setUsuarios}) {
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [sexo, setSexo] = useState("");

    const [edit, setEdit] = useState(false);
    const [hidden, setHidden] = useState(true);
    
    const url = 'http://localhost:3000/users';

    const clearForm = () => {
        setId("")
        setName("");
        setPassword("");
        setEmail("");
        setDataNascimento("");
        setSexo("");

        setHidden(true); 
    }

    const handleCancelar = () => {
        clearForm();
    }

    // Busca apenas um produto pelo seu id:
    const getUsuarioById = async(id) => {
        // Faz a requisição http
        const res = await fetch(url + `/${id}`);
        const data = await res.json();
        // Carrega os dados no formulário para edição:
        setName(data.name)
        setPassword(data.password);
        setEmail(data.email);
        setDataNascimento(data.dataNascimento);
        setSexo(data.sexo)
        setId(data.id);
    }

    const saveUsuario = async (e) => {
        e.preventDefault();
        const saveRequestParams = {
            method: edit ? "PUT" : "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ name, password, email, dataNascimento, sexo})
        }

        // Cria url para buscar todos ou apenas um produto
        const save_url = edit ? url + `/${id}` : url;

        // Faz a requisição http
        const res = await fetch(save_url, saveRequestParams);

        // Se for cadastro de produto novo:
        if(!edit) {
            const newUsuario = await res.json();
            // Atualização da tabela:
            setUsuarios((pervUsuarios) => [...pervUsuarios, newUsuario]);
            window.alert('Registro cadastrado com sucesso');
        }

        // Se for edição/atualização de produto já cadastrado:
        if(edit) {
            const editedUsuario = await res.json();
            // Atualização da tabela:
            const editedUsuarioIndex = usuarios.findIndex(serv => serv.id === id);
            usuarios[editedUsuarioIndex] = editedUsuario;
            setUsuarios(usuarios);
            window.alert('Registro alterado com sucesso');
        }

        clearForm();
        setEdit(false);
    }

    const deleteUsuario = async(id) => {
        // Faz a requisição http
        const res = await fetch(url + `/${id}`, {
        method: "DELETE",
        headers: {
            "content-type": "application/json"
        },
        });

        const deletedUsuario = await res.json();
        // Atualização da tabela:
        setUsuarios(usuarios.filter(serv => serv.id !== deletedUsuario.id));
    }

    const currencyFormatter = (value) => {
        return parseFloat(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    }

    const numberFormatter = (value) => {   
        return parseFloat(value).toFixed(2).replace('.',',');
    }

    // Mudança dos estados ao digitar no formulário:
    const handleName = (e) => {setName(e.target.value)};
    const handlePassword = (e) => {setPassword(e.target.value)};
    const handleEmail = (e) => {setEmail(e.target.value)};
    const handleDataNascimento = (e) => {setDataNascimento(e.target.value)};
    const handleSexo = (e) => {setSexo(e.target.value)};

    const handleClickEdit = (id) => {
        setEdit(true);
        getUsuarioById(id);
    }

    const handleClickExcluir = user => {
        window.confirm(`Deseja realmente excluir o usuário? '${user.name}'?`) ? deleteUsuario(user.id) : null;  
    } 

    return (
        <>
            <div className="table_container">
                <h2>Lista de Usuários</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id.</th>
                            <th>Nome</th>
                            <th>Senha</th>
                            <th>Email</th>
                            <th>Data de Nascimento</th>
                            <th>Sexo</th>
                            <th style={{textAlign: 'center'}}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario) => (
                            <tr key={usuario.id}>
                                <td>{usuario.id}</td>
                                <td>{usuario.name}</td>
                                <td>{usuario.password}</td>            
                                <td>{usuario.email}</td>
                                <td>{usuario.dataNascimento}</td>
                                <td>{usuario.sexo}</td>
                                <td className="actions">
                                    <button data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => handleClickEdit(usuario.id)}>Editar</button>
                                    <button onClick={() => handleClickExcluir(usuario)}>Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Cadastrar Usuários
            </button>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="false">
                
                <div className="modal-dialog">
                    <div className="modal-content">
                        
                        <div id="loaderSpinner" className="hidden spinner-container" style={{backgroundColor: "rgba(0,0,0,0.4)"}}>
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>

                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Cadastro de Usuários</h1>
                        </div>

                        <div className="modal-body">

                            <UsuariosForm loading={loading} hidden={hidden} name={name} 
                                password={password} email={email} dataNascimento={dataNascimento} 
                                sexo={sexo}

                                handleSexo={handleSexo} handleDataNascimento={handleDataNascimento} 
                                handleEmail={handleEmail} handlePassword={handlePassword}
                                handleName={handleName} saveUsuario={saveUsuario} handleCancelar={handleCancelar}
                            />
                                
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}