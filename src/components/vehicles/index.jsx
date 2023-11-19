import { React, useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useNavigate } from 'react-router-dom';
import supabase from '../../lib/helper/supabaseClient';
import './style.css';
const Vehicle = () => {
    const [vehicles, setVehicle] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [loading, setLoading] = useState(false);

    let navigate = useNavigate();
    const onNewClick = () => navigate('new');

    const getVehicles = async () => {
        const { data, error } = await supabase.from('Car').select('*');
        console.log(data, error);
        return { data, error };
    }

    const renderHeader = () => {
        return (
            <div className='data-table-vehicle-header'>
                <div className="flex flex-column">
                    <div> Veículos </div>
                    <p> Selecione um item para efetuar uma ação </p>
                </div>
                <div className="flex justify-content-end">
                    <Button type="button" icon="pi pi-plus-circle" label="Adicionar" outlined onClick={onNewClick} />
                    <Button type="button" icon="pi pi-pencil" label="Editar" outlined /* onClick={edit} */ disabled={selectedVehicle ? false : true} style={{ margin: '0px 8px' }} />
                    <Button type="button" icon="pi pi-trash" label="Excluir" outlined /* onClick={edit} */ disabled={selectedVehicle ? false : true} />
                </div>
            </div>
        );
    };

    useEffect(() => {
        setLoading(true);
        getVehicles().then((itens) => {
            setLoading(false);
            setVehicle(itens.data);
        });
    }, []);

    const header = renderHeader();
    return (
        <div>
            <DataTable loading={loading} loadingIcon="pi pi-spinner" style={{ margin: '16px' }} value={vehicles} header={header} stripedRows selectionMode="single" selection={selectedVehicle} onSelectionChange={(e) => setSelectedVehicle(e.value)} dataKey="carId" tableStyle={{ minWidth: '50rem' }}>
                <Column field="name" header="Nome do Veiculo"></Column>
                <Column field="chassis" header="Chassi"></Column>
                <Column field="color" header="Cor"></Column>
                <Column field="fuelType" header="Tipo de combustível"></Column>
                <Column field="kilometers" header="Kilometragem"></Column>
                <Column field="plateNumber" header="Número da placa"></Column>
                <Column field="renavam" header="Renavam"></Column>
                <Column field="sellPrice" header="Preço de venda"></Column>
                <Column field="year" header="Ano do veículo"></Column>
            </DataTable>
        </div>
    )
}

export default Vehicle;