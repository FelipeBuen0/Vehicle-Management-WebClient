import { React, useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useNavigate } from 'react-router-dom';
import supabase from '../../lib/helper/supabaseClient';
const Vehicle = () => {
    const [vehicles, setVehicle] = useState([]);
    const [first, setFirst] = useState(0);

    let navigate = useNavigate();
    const onNewClick = () => navigate('new');

    const getVehicles = async () => {
        const { data, error} = await supabase.from('Car').select('*');
        console.log(data, error);
        return { data, error};
    }

    useEffect(() => {
        const record = getVehicles();
        console.log(record);
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
                <Button style={{ margin: '16px' }} label='Adicionar veículo' onClick={onNewClick} />
            </div>
        </div>
    )
}

export default Vehicle;