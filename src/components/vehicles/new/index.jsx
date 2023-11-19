import { React, useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Toast } from 'primereact/toast';
import supabase from '../../../lib/helper/supabaseClient';
import { Dropdown } from 'primereact/dropdown';
import { Fieldset } from 'primereact/fieldset';
import { InputMask } from 'primereact/inputmask';
import { useNavigate } from 'react-router-dom';
import './style.css';
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
    const [tip, setTip] = useState('');
    const toast = useRef(null);
    const navigate = useNavigate();

    const options = [
        { name: 'Álcool', value: 'Alcool' },
        { name: 'Gasolina', value: 'Gasolina' },
        { name: 'Diesel', value: 'Diesel' },
        { name: 'Elétrico', value: 'Elétrico' },
    ]

    const showSuccess = () => {
        toast.current.show({
            severity: 'success',
            summary: 'Success',
            detail: 'Veículo adicionado com sucesso!',
            life: 3000
        })
    };
    const showError = () => {
        toast.current.show({
            severity: 'error',
            summary: 'Error',
            detail: 'Não foi possível adicionar o veículo!',
            life: 3000
        })
    };

    const validateForm = (e) => {
        e.preventDefault();
        if (carName.length <= 2) {
            return setTip('O nome do veículo deve conter pelo menos mais que duas letras!');
        }
        if (!chassis.length) {
            return setTip('O chassi do veículo é necessário para prosseguir')
        }
        if (kilometers < 0) {
            return setTip('A quilometragem não pode ser menor que 0!');
        }
        if (!renavam) {
            return setTip('Renavam do veículo é necessário para prosseguir');
        }
        if (!fuelType) {
            return setTip('O tipo de combustível é necessário para prosseguir');
        }
        if (!sellPrice) {
            return setTip('O preço de venda é necessário para prosseguir');
        }
        return onSave();
    }

    const onSave = async () => {
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
            if (!error) {
                navigate('/vehicle')
            }
        }
        catch (e) {
            console.log(e);
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
                                <InputText keyfilter="alpha" id="carColor" value={carColor} onChange={(e) => setCarColor(e.target.value)} placeholder="Ex: Prata" />
                                <label htmlFor="carColor">Cor do veículo</label>
                            </span>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className="p-inputgroup flex-1 input-m">
                            <span className="p-inputgroup-addon"><i className='pi pi-ticket'></i></span>
                            <span className='p-float-label'>
                                <InputMask mask="aaa-9999" id="plateNumber" value={plateNumber} onChange={(e) => setPlateNumber(e.target.value)} />
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
                                <InputNumber id="kilometers" value={kilometers} onChange={(e) => setKilometers(e.value)} />
                                <label htmlFor="kilometers">Quilometragem</label>
                            </span>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className="p-inputgroup flex-1 input-m">
                            <span className="p-inputgroup-addon"><i className='pi pi-wallet'></i></span>
                            <span className='p-float-label'>
                                <InputText keyfilter="int" id="renavam" value={renavam} onChange={(e) => setRenavam(e.target.value)} />
                                <label htmlFor="renavam"> Renavam </label>
                            </span>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className="p-inputgroup flex-1 input-m">
                            <span className="p-inputgroup-addon"><i className='pi pi-calendar'></i></span>
                            <span className='p-float-label'>
                                <InputText keyfilter='int' maxLength='4' id="carYear" value={carYear} onChange={(e) => setCarYear(e.target.value)} placeholder="2019" />
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
                    <div className="flex justify-content-between button-m">
                        <p className='tip-error'>{tip}</p>
                        <Button style={{ margin: '4px' }} label='Salvar' onClick={validateForm} />
                    </div>
                </Fieldset>
            </div>
        </>
    )
}
export default VehicleNew;