import ProductForm from "./ProductForm";
import { useState, useEffect } from 'react'

export default function ProductTable({products, setProducts}) {
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [edit, setEdit] = useState(false);
    const [hidden, setHidden] = useState(true);
    
    const url = 'http://localhost:3000/products';

    const clearForm = () => {
        setName("");
        setPrice("");
        setStock("");
        setHidden(true);
    }

    // Busca apenas um produto pelo seu id:
    const getProductById = async(id) => {
        // Faz a requisição http
        const res = await fetch(url + `/${id}`);
        const data = await res.json();
        // Carrega os dados no formulário para edição:
        setName(data.name)
        setPrice(data.price);
        setStock(data.stock);
        setId(data.id);
    }

    const saveProduct = async (e) => {
        e.preventDefault();
        const saveRequestParams = {
        method: edit ? "PUT" : "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ name, price, stock })
        }

        // Cria url para buscar todos ou apenas um produto
        const save_url = edit ? url + `/${id}` : url;

        // Faz a requisição http
        const res = await fetch(save_url, saveRequestParams);

        // Se for cadastro de produto novo:
        if(!edit) {
            const newProduct = await res.json();
            // Atualização da tabela:
            setProducts((prevProducts) => [...prevProducts, newProduct]);
            window.alert('Registro cadastrado com sucesso');
        }

        // Se for edição/atualização de produto já cadastrado:
        if(edit) {
            const editedProduct = await res.json();
            // Atualização da tabela:
            const editedProductIndex = products.findIndex(prod => prod.id === id);
            products[editedProductIndex] = editedProduct;
            setProducts(products);
            window.alert('Registro alterado com sucesso');
        }

        clearForm();
        setEdit(false);
    }

    const deleteProduct = async(id) => {
        // Faz a requisição http
        const res = await fetch(url + `/${id}`, {
        method: "DELETE",
        headers: {
            "content-type": "application/json"
        },
        });

        const deletedProduct = await res.json();
        // Atualização da tabela:
        setProducts(products.filter(prod => prod.id !== deletedProduct.id));
    }

    const currencyFormatter = (value) => {
        return parseFloat(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    }

    const numberFormatter = (value) => {   
        return parseFloat(value).toFixed(2).replace('.',',');
    }

    // Mudança dos estados ao digitar no formulário:
    const handleName = (e) => {setName(e.target.value)};
    const handlePrice = (e) => {setPrice(e.target.value)};
    const handleStock = (e) => {setStock(e.target.value)};

    const handleClickEdit = (id) => {
        setEdit(true);
        getProductById(id);
    }

    const handleClickExcluir = prod => {
        window.confirm(`Deseja realmente excluir o item '${prod.name}'?`) ? deleteProduct(prod.id) : null;  
    } 

    return (
        <>
            <div className="table_container">
                <h2>Lista de Produtos</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Cod.</th>
                            <th>Nome</th>
                            <th>Preço</th>
                            <th>Estoque (kg)</th>
                            <th style={{textAlign: 'center'}}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((prod) => (
                            <tr key={prod.id}>
                                <td>{prod.id}</td>
                                <td>{prod.name}</td>
                                <td>{currencyFormatter(prod.price)}</td>            
                                <td>{numberFormatter(prod.stock)}</td>
                                <td className="actions">
                                <button data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => handleClickEdit(prod.id)}>Editar</button>
                                <button onClick={() => handleClickExcluir(prod)}>Excluir</button>
                            </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Cadastrar Produto
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
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Cadastro de produtos</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body">
                            <ProductForm loading={loading} hidden={hidden} name={name} price={price} stock={stock} handleName={handleName} handlePrice={handlePrice} handleStock={handleStock} saveProduct={saveProduct}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}