import React from 'react'

function UsuariosForm({hidden, name, password, email, 
                    dataNascimento, sexo, handleName, 
                    handlePassword, handleEmail, handleDataNascimento, handleSexo, saveUsuario, handleCancelar}) {

    return (
        <div>
            <form onSubmit={(e) => saveUsuario(e)}>

                <label className='form-label' htmlFor="name">Nome:</label>
                <input className='form-input' value={name} type="text" name="name" onChange={(e) => handleName(e)} required/>

                <label className='form-label' htmlFor="password">Senha:</label>
                <input className='form-input' value={password} type="number" name="password" onChange={(e) => handlePassword(e)} required/>

                <label className='form-label' htmlFor="email">Email:</label>
                <input className='form-input' value={email} type="text" name="email" onChange={(e) => handleEmail(e)} required/>
                
                <label className='form-label' htmlFor="dataNascimento">data de nascimento</label>
                <input className='form-input' value={dataNascimento} type="date" name="dataNascimento" onChange={(e) => handleDataNascimento(e)} required/>
                
                <label className='form-label' htmlFor="sexo">Sexo</label>
                <input className='form-input' value={sexo} type="text" name="sexo" onChange={(e) => handleSexo(e)} required/>

                <input className='btn btn-success' type="submit" value="Salvar" data-bs-dismiss="modal"/>
                <button className='btn btn-primary m-2' type="button" data-bs-dismiss="modal" onClick={handleCancelar}>Cancelar</button>

            </form>
      </div>
    )
}

export default UsuariosForm
