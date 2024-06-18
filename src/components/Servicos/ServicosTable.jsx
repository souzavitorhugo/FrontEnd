import ProductForm from "./ServicosForm";
import { useState, useEffect } from 'react'

export default function ProductTable({servicos, setServicos}) {
    const [loading, setLoading] = useState(false);
    
    const [id, setId] = useState("");
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState("");
    const [custoMaoDeObra, setCustoMaoDeObra] = useState("");
    const [tempoServico, setTempoServico] = useState("");
    const [ferramentaMaquinaUtilizada, setFerramentaMaquinaUtilizada] = useState("");

    const [edit, setEdit] = useState(false);
    const [hidden, setHidden] = useState(true);
    
    const url = 'http://localhost:3000/services';

    const clearForm = () => {
        setId("")
        setDescricao("");
        setPreco("");
        setCustoMaoDeObra("");
        setTempoServico("");
        setFerramentaMaquinaUtilizada("");

        setHidden(true);
    }

    const handleCancelar = () => {
        clearForm();
    }

    // Busca apenas um produto pelo seu id:
    const getServiceById = async(id) => {
        // Faz a requisição http
        const res = await fetch(url + `/${id}`);
        const data = await res.json();
        // Carrega os dados no formulário para edição:
        setDescricao(data.descricao)
        setPreco(data.preco);
        setCustoMaoDeObra(data.custoMaoDeObra);
        setTempoServico(data.tempoServico);
        setFerramentaMaquinaUtilizada(data.ferramentaMaquinaUtilizada)
        setId(data.id);
    }

    const saveServico = async (e) => {
        e.preventDefault();
        const saveRequestParams = {
            method: edit ? "PUT" : "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ descricao, preco, custoMaoDeObra, tempoServico, ferramentaMaquinaUtilizada})
        }

        // Cria url para buscar todos ou apenas um produto
        const save_url = edit ? url + `/${id}` : url;

        // Faz a requisição http
        const res = await fetch(save_url, saveRequestParams);

        // Se for cadastro de produto novo:
        if(!edit) {
            const newServico = await res.json();
            // Atualização da tabela:
            setServicos((pervServicos) => [...pervServicos, newServico]);
            window.alert('Registro cadastrado com sucesso');
        }

        // Se for edição/atualização de produto já cadastrado:
        if(edit) {
            const editedServico = await res.json();
            // Atualização da tabela:
            const editedServicoIndex = servicos.findIndex(serv => serv.id === id);
            servicos[editedServicoIndex] = editedServico;
            setServicos(servicos);
            window.alert('Registro alterado com sucesso');
        }

        clearForm();
        setEdit(false);
    }

    const deleteServico = async(id) => {
        // Faz a requisição http
        const res = await fetch(url + `/${id}`, {
        method: "DELETE",
        headers: {
            "content-type": "application/json"
        },
        });

        const deletedServico = await res.json();
        // Atualização da tabela:
        setServicos(servicos.filter(serv => serv.id !== deletedServico.id));
    }

    const currencyFormatter = (value) => {
        return parseFloat(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    }

    const numberFormatter = (value) => {   
        return parseFloat(value).toFixed(2).replace('.',',');
    }

    // Mudança dos estados ao digitar no formulário:
    const handleDescricao = (e) => {setDescricao(e.target.value)};
    const handlePreco = (e) => {setPreco(e.target.value)};
    const handleCustoMaoDeObra = (e) => {setCustoMaoDeObra(e.target.value)};
    const handleTempoServico = (e) => {setTempoServico(e.target.value)};
    const handleFerramentaMaquinaUtilizada = (e) => {setFerramentaMaquinaUtilizada(e.target.value)};

    const handleClickEdit = (id) => {
        setEdit(true);
        getServiceById(id);
    }

    const handleClickExcluir = serv => {
        window.confirm(`Deseja realmente excluir o item '${serv.descricao}'?`) ? deleteServico(serv.id) : null;  
    } 

    return (
        <>
            <div className="table_container">
                <h2>Lista de Serviços</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Cod.</th>
                            <th>Descrição</th>
                            <th>Preço</th>
                            <th>Custo mão de obra</th>
                            <th>Tempo estimado serviço (horas)</th>
                            <th>Ferramenta/Máquina utilizada</th>
                            <th style={{textAlign: 'center'}}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {servicos.map((serv) => (
                            <tr key={serv.id}>
                                <td>{serv.id}</td>
                                <td>{serv.descricao}</td>
                                <td>{currencyFormatter(serv.preco)}</td>            
                                <td>{serv.custoMaoDeObra}</td>
                                <td>{serv.tempoServico}</td>
                                <td>{serv.ferramentaMaquinaUtilizada}</td>
                                <td className="actions">
                                    <button data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => handleClickEdit(serv.id)}>Editar</button>
                                    <button onClick={() => handleClickExcluir(serv)}>Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Cadastrar Serviço
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
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Cadastro de Serviços</h1>
                        </div>

                        <div className="modal-body">

                            <ProductForm loading={loading} hidden={hidden} descricao={descricao} 
                                preco={preco} custoMaoDeObra={custoMaoDeObra} tempoServico={tempoServico} 
                                ferramentaMaquinaUtilizada={ferramentaMaquinaUtilizada}

                                handleFerramentaMaquinaUtilizada={handleFerramentaMaquinaUtilizada} handleTempoServico={handleTempoServico} 
                                handleCustoMaoDeObra={handleCustoMaoDeObra} handlePreco={handlePreco}
                                handleDescricao={handleDescricao} saveServico={saveServico} handleCancelar={handleCancelar}
                            />
                                
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}