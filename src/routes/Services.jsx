import { useState, useEffect } from 'react'

import ServicosTable from '../components/Servicos/ServicosTable'
import ServicosForm from '../components/Servicos/ServicosForm'

export default function Services() {
    const [servicos, setServicos] = useState([]);

    const url = 'http://localhost:3000/services';

    useEffect(() => {
        // Lista todos os produtos:
        const getServicesList = async() => {
            const res = await fetch(url);
            const data = await res.json();

            setServicos(data);
        }

        getServicesList();

    }, []);

    return (
        <>
            <h2>Serviços</h2>
            <div>
                {
                    servicos.length > 0 ? <ServicosTable servicos={servicos} setServicos={setServicos}/> : <h3 style={{marginBottom: '30px'}}>Nenhum Serviço cadastrado...</h3>
                }
            </div>
        </>
    )
}