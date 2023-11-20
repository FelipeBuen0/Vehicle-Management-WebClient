import { React, useState, useRef, useEffect } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Toast } from 'primereact/toast';
import supabase from '../../../lib/helper/supabaseClient';
import { Dropdown } from 'primereact/dropdown';
import { InputMask } from 'primereact/inputmask';
import { useNavigate, useParams } from 'react-router-dom';
import './style.css';
import { Panel } from 'primereact/panel';
const VehicleForm = (props) => {
    const param = useParams();

    const getDetails = async () => {
        const { data } = await supabase.from('Car').select().eq('carId', param.id);
        return data[0];
    }
    const [name, setCarName] = useState('');
    const [sellPrice, setSellPrice] = useState('');
    const [plateNumber, setPlateNumber] = useState('');
    const [color, setCarColor] = useState('');
    const [year, setCarYear] = useState('');
    const [fuelType, setFuelType] = useState('');
    const [kilometers, setKilometers] = useState(0);
    const [renavam, setRenavam] = useState('');
    const [chassis, setChassis] = useState('');
    const [tip, setTip] = useState('');

    //in my defense I'm in a hurry...
    useEffect(() => {
        const fetchData = async () => {
            const details = await getDetails();
            if (details) {
                setCarName(details.name || null);
                setSellPrice(details.sellPrice || null);
                setPlateNumber(details.plateNumber || null);
                setCarColor(details.color || null);
                setCarYear(details.year || null);
                setFuelType(details.fuelType || null);
                setKilometers(details.kilometers || null);
                setRenavam(details.renavam || null);
                setChassis(details.chassis || null);
            }
        };

        if (props.crudState === 'u') {
            fetchData();
        }
    }, [props.crudState]);

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
            detail: `Veículo ${props.crudState === 'u' ? 'atualizado' : 'criado'} com sucesso!`,
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
        if (name.length <= 2) {
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
            if (props.crudState === 'u') {
                console.log(props.crudState)
                const { data, error } = await supabase.from('Car').update({ name, sellPrice, color, plateNumber, year, fuelType, kilometers, renavam, chassis }).eq('carId', param.id).select();
                console.log(data);
                onSuccess(error);
            }
            else {
                console.log(props.crudState)
                const { error } = await supabase.from('Car').insert({
                    name: name,
                    brand: 'Honda',
                    sellPrice: sellPrice,
                    color: color,
                    plateNumber: plateNumber,
                    carModelId: 1,
                    year: year,
                    fuelType: fuelType,
                    kilometers: kilometers,
                    renavam: renavam,
                    chassis: chassis
                });
                onSuccess(error);
            }
        }
        catch (e) {
            console.log(e);
            showError()
        }
    }

    const onSuccess = (error) => {
        showSuccess()
        if (!error) {
            navigate('/vehicle')
        }
    }
    return (
        <>
            <Toast ref={toast} />
            <div className="form-vehicle flex justify-content-center align-items-center">
                <Panel header="Adicione um veículo" className='card flex flex-column'>
                    <div className='flex'>
                        <div className="p-inputgroup flex-1 input-m">
                            <span className="p-float-label">
                                <InputText id="car" value={name} onChange={(e) => setCarName(e.target.value)} placeholder="Ex: civic" />
                                <label htmlFor="car"><i className="pi pi-car"></i> Nome do carro</label>
                            </span>
                        </div>
                    </div>
                    <div className="flex ">
                        <div className="p-inputgroup flex-1 input-m">
                            <span className="p-float-label">
                                <InputText keyfilter="alpha" id="color" value={color} onChange={(e) => setCarColor(e.target.value)} placeholder="Ex: Prata" />
                                <label htmlFor="color"><i className="pi pi-palette"></i> Cor do veículo</label>
                            </span>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className="p-inputgroup flex-1 input-m">
                            <span className='p-float-label'>
                                <InputMask mask="aaa-9999" id="plateNumber" value={plateNumber} onChange={(e) => setPlateNumber(e.target.value)} />
                                <label htmlFor="plateNumber"><i className='pi pi-ticket'></i> Placa do veíulo</label>
                            </span>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className="p-inputgroup flex-1 input-m">
                            <span className='p-float-label'>
                                <InputText id="chassis" value={chassis} onChange={(e) => setChassis(e.target.value)} />
                                <label htmlFor="chassis"><i className='pi pi-wrench'></i> Chassi do veículo</label>
                            </span>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className="p-inputgroup flex-1 input-m">
                            <span className='p-float-label'>
                                <InputNumber id="kilometers" value={kilometers} onChange={(e) => setKilometers(e.value)} />
                                <label htmlFor="kilometers">Quilometragem</label>
                            </span>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className="p-inputgroup flex-1 input-m">
                            <span className='p-float-label'>
                                <InputText keyfilter="int" id="renavam" value={renavam} onChange={(e) => setRenavam(e.target.value)} />
                                <label htmlFor="renavam"><i className='pi pi-wallet'></i> Renavam </label>
                            </span>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className="p-inputgroup flex-1 input-m">
                            <span className='p-float-label'>
                                <InputText keyfilter='int' maxLength='4' id="year" value={year} onChange={(e) => setCarYear(e.target.value)} placeholder="2019" />
                                <label htmlFor="year"><i className='pi pi-calendar'></i> Ano do veículo</label>
                            </span>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className="p-inputgroup input-m">
                            <span className="p-float-label">
                                <Dropdown id="selectFuelType" value={fuelType} onChange={(e) => setFuelType(e.value)} options={options} optionLabel="name"
                                    placeholder="Selecione o tipo de combustível" />
                                <label htmlFor="selectFuelType"><i className='pi pi-power-off'></i> Tipo de combustível</label>
                            </span>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="p-inputgroup input-m">
                            <span className="p-inputgroup-addon">R$</span>
                            <span className='p-float-label'>
                                <InputNumber id="sellPrice" value={sellPrice} onChange={(e) => setSellPrice(e.value)} placeholder="220,000" />
                                <label htmlFor="sellPrice">Preço de venda</label>
                            </span>
                            <span className="p-inputgroup-addon">.00</span>
                        </div>
                    </div>
                    <div className="flex justify-content-end button-m">
                        <p className='tip-error'>{tip}</p>
                        <Button style={{ margin: '4px' }} label='Salvar' onClick={validateForm} />
                    </div>
                </Panel>
            </div>
        </>
    )
}
export default VehicleForm;