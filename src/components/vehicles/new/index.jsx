import { React, useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Toast } from 'primereact/toast';
import './style.css';
import supabase from '../../../lib/helper/supabaseClient';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { TabView } from 'primereact/tabview';
import { TabMenu } from 'primereact/tabmenu';
import { Fieldset } from 'primereact/fieldset';
const VehicleNew = () => {
    const [carName, setCarName] = useState('');
    const [sellPrice, setSellPrice] = useState();
    const [plateNumber, setPlateNumber] = useState('');
    const [carColor, setCarColor] = useState('');
    const [carYear, setCarYear] = useState('');
    const [fuelType, setFuelType] = useState('');
    const [kilometers, setKilometers] = useState(0);
    const [renavam, setRenavam] = useState('');
    const [chassis, setChassis] = useState('');
    const [carModelId, setCarModelId] = useState(0);
    const toast = useRef(null);

    const options = [
        { name: 'Álcool', value: 1 },
        { name: 'Gasolina', value: 2 },
        { name: 'Diesel', value: 3 },
        { name: 'Elétrico', value: 4 },
    ]

    const showSuccess = () => { toast.current.show({ severity: 'success', summary: 'Success', detail: 'Veículo adicionado com sucesso!', life: 3000 }) };
    const showError = () => { toast.current.show({ severity: 'error', summary: 'Error', detail: 'Não foi possível adicionar o veículo!', life: 3000 }) };

    const onSave = async (e) => {
        e.preventDefault();
        let data = {
            name: carName,
            sellPrice: sellPrice,
            color: carColor
        }
        try {
            const { error } = await supabase.from('Car').insert({
                name: carName,
                brand: 'Honda',
                sellPrice: sellPrice,
                color: carColor,
                plateNumber: plateNumber,
                carModelId: 1,
                year: carYear,
                fuelType: fuelType,
                kilometers: kilometers,
                renavam: renavam,
                chassis: chassis
            });
            showSuccess()
        }
        catch (e) {
            showError()
        }
    }
    return (
        <>
            <div className="form-vehicle flex justify-content-center align-items-center">
                <Toast ref={toast} />
                <Fieldset legend="Adicione um veículo" className='card flex flex-column' style={{ margin: '16px' }} >
                    <div className='flex'>
                        <div className="p-inputgroup flex-1 input-m">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-car"></i>
                            </span>
                            <span className="p-float-label">
                                <InputText id="car" value={carName} onChange={(e) => setCarName(e.target.value)} placeholder="Ex: civic" />
                                <label htmlFor="car">Nome do carro</label>
                            </span>
                        </div>
                    </div>
                    <div className="flex ">
                        <div className="p-inputgroup flex-1 input-m">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-palette"></i>
                            </span>
                            <span className="p-float-label">
                                <InputText id="carColor" value={carColor} onChange={(e) => setCarColor(e.target.value)} placeholder="Ex: Prata" />
                                <label htmlFor="carColor">Cor do veículo</label>
                            </span>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className="p-inputgroup flex-1 input-m">
                            <span className="p-inputgroup-addon"><i className='pi pi-ticket'></i></span>
                            <span className='p-float-label'>
                                <InputText id="plateNumber" value={plateNumber} onChange={(e) => setPlateNumber(e.target.value)} placeholder="ABC-1234" />
                                <label htmlFor="plateNumber">Placa do veíulo</label>
                            </span>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className="p-inputgroup flex-1 input-m">
                            <span className="p-inputgroup-addon"><i className='pi pi-wrench'></i></span>
                            <span className='p-float-label'>
                                <InputText id="chassis" value={chassis} onChange={(e) => setChassis(e.target.value)} />
                                <label htmlFor="chassis">Chassi do veículo</label>
                            </span>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className="p-inputgroup flex-1 input-m">
                            <span className="p-inputgroup-addon">Km</span>
                            <span className='p-float-label'>
                                <InputText id="kilometers" value={kilometers} onChange={(e) => setKilometers(e.target.value)} />
                                <label htmlFor="kilometers">Quilometragem</label>
                            </span>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className="p-inputgroup flex-1 input-m">
                            <span className="p-inputgroup-addon"><i className='pi pi-wallet'></i></span>
                            <span className='p-float-label'>
                                <InputText id="renavam" value={renavam} onChange={(e) => setRenavam(e.target.value)} />
                                <label htmlFor="renavam"> Renavam </label>
                            </span>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className="p-inputgroup flex-1 input-m">
                            <span className='p-float-label'>
                                <Calendar id="carYear" showIcon value={carYear} onChange={(e) => setCarYear(e.value)} placeholder="2019" />
                                <label htmlFor="carYear">Ano do veículo</label>
                            </span>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className="p-inputgroup input-m">
                            <span className="p-float-label">
                                <Dropdown id="selectFuelType" value={fuelType} onChange={(e) => setFuelType(e.value)} options={options} optionLabel="name"
                                    placeholder="Selecione o tipo de combustível" />
                                <label htmlFor="selectFuelType">Tipo de combustível</label>
                            </span>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="p-inputgroup flex-1 input-m">
                            <span className="p-inputgroup-addon">R$</span>
                            <span className='p-float-label'>
                                <InputNumber id="sellPrice" value={sellPrice} onChange={(e) => setSellPrice(e.value)} placeholder="220,000" />
                                <label htmlFor="sellPrice">Preço de venda</label>
                            </span>
                            <span className="p-inputgroup-addon">.00</span>
                        </div>
                    </div>
                    <div className="flex justify-content-end button-m">
                        <Button style={{ margin: '4px' }} label='Salvar' onClick={onSave} />
                    </div>
                </Fieldset>
            </div>
        </>
    )
}
export default VehicleNew;