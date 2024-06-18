import React from 'react'

function ServicosForm({hidden, descricao, preco, custoMaoDeObra, 
                    tempoServico, ferramentaMaquinaUtilizada, handleDescricao, 
                    handlePreco, handleCustoMaoDeObra, handleTempoServico, handleFerramentaMaquinaUtilizada, saveServico, handleCancelar}) {

    return (
        <div>
            <form onSubmit={(e) => saveServico(e)}>

                <label className='form-label' htmlFor="descricao">Descricao:</label>
                <input className='form-input' value={descricao} type="text" name="descricao" onChange={(e) => handleDescricao(e)} required/>

                <label className='form-label' htmlFor="preco">Preço:</label>
                <input className='form-input' value={preco} type="number" name="preco" onChange={(e) => handlePreco(e)} required/>

                <label className='form-label' htmlFor="custoMaoDeObra">Custo Mão De Obra:</label>
                <input className='form-input' value={custoMaoDeObra} type="number" name="custoMaoDeObra" onChange={(e) => handleCustoMaoDeObra(e)} required/>
                
                <label className='form-label' htmlFor="tempoServico">Tempo estimado serviço (horas)</label>
                <input className='form-input' value={tempoServico} type="number" name="tempoServico" onChange={(e) => handleTempoServico(e)} required/>
                
                <label className='form-label' htmlFor="ferramentaMaquinaUtilizada">Ferramenta/máquina utilizada</label>
                <input className='form-input' value={ferramentaMaquinaUtilizada} type="text" name="ferramentaMaquinaUtilizada" onChange={(e) => handleFerramentaMaquinaUtilizada(e)} required/>

                <input className='btn btn-success' type="submit" value="Salvar" data-bs-dismiss="modal"/>
                <button className='btn btn-primary m-2' type="button" data-bs-dismiss="modal" onClick={handleCancelar}>Cancelar</button>

            </form>
      </div>
    )
}

export default ServicosForm
