import { React, useState, useRef } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import fireStore from '../../../firebase';
import {addDoc, collection} from '@firebase/firestore'
const VehicleNew = () => {
    const [car, setCar] = useState('');
    const [parkingSlot, setParkingSlot] = useState('');
    const [customer, setCustomer] = useState('');
    const collectionReference = collection(fireStore, "vehicles"); 
    const toast = useRef(null);
    const showSuccess = () => { toast.current.show({ severity:'success', summary: 'Success', detail:'Veículo adicionado com sucesso!', life: 3000 })};
    const showError = () => { toast.current.show({ severity:'error', summary: 'Error', detail:'Não foi possível adicionar o veículo!', life: 3000 })};
    const onSave = (e) => {
        e.preventDefault();
        console.log(car, parkingSlot, customer);
        let data = {
            vehicleName: car,
            customerName: customer,
            parkingSlot: parkingSlot
        }
        try {
            addDoc(collectionReference, data);
            showSuccess()
        }
        catch (e) {
            console.error(e)
        }
    }
    return (
        <div>
            <Toast ref={toast}/>
            <Card style={{ margin: '8px' }} title="Adicionar veículo a uma vaga ">
                <div className="flex flex-column gap-2" style={{ margin: '4px' }}>
                    <label htmlFor="car"> Carro </label>
                    <InputText id="car" value={car} onChange={(e) => setCar(e.target.value)} />
                </div>
                <div className="flex flex-column gap-2" style={{ margin: '4px' }}>
                    <label htmlFor="customer"> Cliente </label>
                    <InputText id="customer" value={customer} onChange={(e) => setCustomer(e.target.value)} />
                </div>
                <div className="flex flex-column gap-2" style={{ margin: '4px' }}>
                    <label htmlFor="parkingSlot"> Vaga </label>
                    <InputText id="parkingSlot" value={parkingSlot} onChange={(e) => setParkingSlot(e.target.value)} />
                </div>
                <div className="flex justify-content-end">
                    <Button style={{ margin: '4px' }} label='Salvar' onClick={onSave} />
                </div>
            </Card>
        </div>
    )
}
export default VehicleNew;