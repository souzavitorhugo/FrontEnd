import React from 'react'

function ProductForm({hidden, name, price, stock, handleName, handlePrice, handleStock, saveProduct}) {
    return (
        <div>
            <form onSubmit={(e) => saveProduct(e)}>
                <label className='form-label' htmlFor="nome">Nome:</label>
                <input className='form-input' value={name} type="text" name="nome" onChange={(e) => handleName(e)} required/>
                <label className='form-label' htmlFor="preco">Preço:</label>
                <input className='form-input' value={price} type="number" name="preco" onChange={(e) => handlePrice(e)} required/>
                <label className='form-label' htmlFor="estoque">Estoque:</label>
                <input className='form-input' value={stock} type="number" name="estoque" onChange={(e) => handleStock(e)} required/>
                <input className='form-submit' type="submit" value="Salvar" data-bs-dismiss="modal"/>
            </form>
      </div>
    )
}

export default ProductForm
