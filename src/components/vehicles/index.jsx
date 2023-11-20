import { React, useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useNavigate } from 'react-router-dom';
import supabase from '../../lib/helper/supabaseClient';
import './style.css';
import { Toast } from 'primereact/toast';
import { ConfirmPopup, confirmPopup} from 'primereact/confirmpopup';
const Vehicle = () => {
    const [vehicles, setVehicle] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [loading, setLoading] = useState(false);
    const [refreshData, setRefreshData] = useState(false);
    const toast = useRef(null);

    const showSuccess = () => {
        toast.current.show({
            severity: 'success',
            summary: 'Success',
            detail: `Veículo deletedo com sucesso!`,
            life: 3000
        })
    };

    let navigate = useNavigate();
    const onNew = () => navigate('new');
    const onEdit = () => navigate(`${selectedVehicle.carId}`);
    const onDelete = async (event) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Deseja excluir o veículo selecionado?',
            icon: 'pi pi-exclamation-triangle',
            accept,
            reject
        });
    };

    const reject = () => {
        return null;
    };
    const accept = async () => {
        const { error } = await supabase.from('Car').delete().eq('carId', selectedVehicle.carId);
        if (!error) {
            showSuccess();
            setSelectedVehicle(null);
            setRefreshData(!refreshData);
        }
    }

    const getVehicles = async () => {
        const { data, error } = await supabase.from('Car').select();
        localStorage.setItem('vhItems', JSON.stringify({data, error}));
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
                    <Button type="button" icon="pi pi-plus-circle" outlined onClick={onNew} />
                    <Button type="button" icon="pi pi-pencil" outlined onClick={onEdit} disabled={selectedVehicle ? false : true} style={{ margin: '0px 8px' }} />
                    <Button type="button" icon="pi pi-trash" outlined onClick={onDelete} disabled={selectedVehicle ? false : true} />
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
    }, [refreshData]);
    
    const header = renderHeader();
    return (
        <div>
            <Toast ref={toast} />
            <ConfirmPopup/>
            <DataTable loading={loading} loadingIcon="pi pi-spin pi-spinner" style={{ marginTop: '16px', marginBottom: '16px' }} value={vehicles} header={header} stripedRows selectionMode="single" selection={selectedVehicle} onSelectionChange={(e) => setSelectedVehicle(e.value)} dataKey="carId" tableStyle={{ minWidth: '70rem' }}>
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