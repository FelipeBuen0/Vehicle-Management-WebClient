import { React, useState, useEffect} from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useNavigate } from 'react-router-dom';
const Vehicle = () => {
    let navigate = useNavigate();
    const onNewClick = () => {
        let path = 'new';
        navigate(path);
    }
    const [products, setProducts] = useState([]);
    useEffect(() => {
        setProducts([{
            id: '1000',
            code: 'f230fh0g3',
            name: 'Bamboo Watch',
            description: 'Product Description',
            image: 'bamboo-watch.jpg',
            price: 65,
            category: 'Accessories',
            quantity: 24,
            inventoryStatus: 'INSTOCK',
            rating: 5
        }, {
            id: '1001',
            code: 'RRws0fh0',
            name: 'Gamer controller',
            description: 'Product Description',
            image: 'bamboo-watch.jpg',
            price: 65,
            category: 'Accessories',
            quantity: 24,
            inventoryStatus: 'INSTOCK',
            rating: 5
        }, {
            id: '1002',
            code: 't2s01t230f',
            name: 'Gamer controller',
            description: 'Product Description',
            image: 'bamboo-watch.jpg',
            price: 65,
            category: 'Accessories',
            quantity: 24,
            inventoryStatus: 'INSTOCK',
            rating: 5
        }]);
    }, []);

    return (
        <div>
            <Card style={{ margin: '16px'}} title="Veículos estacionados">
            <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
                <Column field="code" header="Code"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="category" header="Category"></Column>
                <Column field="quantity" header="Quantity"></Column>
            </DataTable>
            </Card>
            <Button style={{ margin: '16px 0px 0px 16px'}} tooltip='Clique para adicionar veículos' label='Adicionar veículo' onClick={onNewClick}/>
        </div>
    )
}

export default Vehicle;