import { React, useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useNavigate } from 'react-router-dom';
import fireStore from '../../firebase';
import { collection, getDocs } from "firebase/firestore";
const Vehicle = () => {
    const [vehicles, setVehicle] = useState([]);
    let navigate = useNavigate();
    const onNewClick = () => {
        let path = 'new';
        navigate(path);
    }
    useEffect(() => {
        let items = [];
        const getCollection = async () => {
            const querySnapshot = await getDocs(collection(fireStore, "vehicles"));
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
                console.log(doc.data());
            });
        }
        getCollection().then(() => setVehicle(items))
    }, []);

    return (
        <div>
            <Card style={{ margin: '16px' }} title="Veículos estacionados">
                <DataTable value={vehicles} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="parkingSlot" header="Vaga alocada"></Column>
                    <Column field="customerName" header="Nome do cliente"></Column>
                    <Column field="vehicleName" header="Nome do Veiculo"></Column>
                </DataTable>
            </Card>
            <div className="flex justify-content-end">
                <Button style={{ margin: '16px' }} tooltip='Clique para adicionar veículos' label='Adicionar veículo' onClick={onNewClick} />
            </div>
        </div>
    )
}

export default Vehicle;