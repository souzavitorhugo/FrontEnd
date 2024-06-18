import { useState, useEffect } from 'react'

import ProductTable from '../components/Produtos/ProductTable'
import ProductForm from '../components/Produtos/ProductForm'

export default function Products() {
    const [products, setProducts] = useState([]);

    const url = 'http://localhost:3000/products';

    useEffect(() => {
        // Lista todos os produtos:
        const getProductsList = async() => {
            const res = await fetch(url);
            const data = await res.json();
            setProducts(data);
        }

        getProductsList();

    }, []);

    return (
        <>
            <h2>Produtos</h2>
            <div>
                {
                    products.length > 0 ? <ProductTable products={products} setProducts={setProducts}/> : <h3 style={{marginBottom: '30px'}}>Nenhum produto cadastrado...</h3>
                }
            </div>
        </>
    )
}