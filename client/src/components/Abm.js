import React from "react";
import '../styles/Abm.css';
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getInfo, registerOperation } from '../actions';
import Modal from 'react-modal';



Modal.setAppElement('#root');


export default function Abm() {

    const dispatch = useDispatch();
    const ingresos = useSelector(state => state.ingresos);
    const egresos = useSelector(state => state.egresos);

    useEffect(() => {
        dispatch(getInfo());
    }, [dispatch]);

    const [input, setInput] = useState({
        concept: "",
        amount: "",
        date: "",
        type: "ingreso",
    });


    const [currentInfo, setCurrentInfo] = useState({
        concept: "",
        amount: "",
        date: "",
    });


    function handleInput(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    function handleInputModal(e) {
        setCurrentInfo({
            ...currentInfo,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (currentInfo.id) {
            if (!currentInfo.concept) {
                return alert('Enter a concept');
            } else if (!currentInfo.amount) {
                return alert('Enter amount');
            } else if (!currentInfo.date) {
                return alert('Select a date');
            }
            dispatch(registerOperation(currentInfo));
            alert('Operation registred successfully!');
            dispatch(getInfo());
            setCurrentInfo({
                concept: "",
                amount: "",
                date: "",
                id: "",
                type: ""
            })
            closeModal();
        } else {
            if (!input.concept) {
                return alert('Enter a concept');
            } else if (!input.amount) {
                return alert('Enter amount');
            } else if (!input.date) {
                return alert('Select a date');
            }
            dispatch(registerOperation(input));
            alert('Operation registred successfully!');
            dispatch(getInfo());
            setInput({
                concept: "",
                amount: "",
                date: "",
                type: "ingreso",
            });
        }
    }

    function handleDelete(e) {
        if (window.confirm('Do you want delete this row?')) {
            dispatch(registerOperation({
                ...currentInfo,
                id: e.id,
                type: e.type,
                destroy: true
            }));
            alert('Operation registered successfully!');
            setCurrentInfo({
                concept: "",
                amount: "",
                date: "",
                id: "",
                type: ""
            })
            dispatch(getInfo());
        }
    }


    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal(e) {
        setCurrentInfo({
            concept: e.concept,
            amount: e.amount,
            date: e.date,
            type: e.type,
            id: e.id
        })
        setIsOpen(true);
    }

    function afterOpenModal() {
    }

    function closeModal() {
        setIsOpen(false);
    }



    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '70%',
            textAlign: 'center',
            backgroundColor: 'transparent'
        },
    };

    return (
        <div className="div-main-abm">
            <Navbar />
            <h2>ABM de Operaciones</h2>
            <div className="div-balance-title div-abm-title">Registro de Operacion</div>
            <form onSubmit={(e) => handleSubmit(e)} className="div-main-form">
                <label>Concepto</label>
                <input name="concept" value={input.concept} placeholder="Ingrese el concepto" type='text' onChange={(e) => handleInput(e)}></input>
                <label>Monto</label>
                <input name="amount" value={input.amount} placeholder="Ingrese un monto" type='number' step='0.01' onChange={(e) => handleInput(e)}></input>
                <label>Fecha</label>
                <input name="date" type='date' value={input.date} onChange={(e) => handleInput(e)}></input>
                <label>Tipo</label>
                <select name="type" value={input.type} onChange={(e) => handleInput(e)}>
                    <option value='ingreso'>Ingreso</option>
                    <option value='egreso'>Egreso</option>
                </select>
                <button type="submit" className="button-form">Confirmar</button>
            </form>

            <h2>Ingresos</h2>

            <div className='div-main-balance div-balance-title-right div-balance-title-left div-balance-margintop'>
                <div className='div-balance-title-left div-balance-title'>Concepto</div>
                <div className='div-balance-title'>Monto</div>
                <div className='div-balance-title'>Fecha</div>
                <div className='div-balance-title-right div-balance-title'>Opciones</div>
            </div>
            <div className='div-main-balance div-main-balance-border'>
                <div className='div-balance-container'>
                    <ul className='div-balance-ul'>
                        {
                            ingresos.length && ingresos.map(i => {
                                return (<li key={i.id}>{i.concept}</li>)
                            })
                        }
                    </ul>
                </div>
                <div className='div-balance-container'>
                    <ul className='div-balance-ul'>
                        {
                            ingresos.length && ingresos.map(i => {
                                return (<li key={i.id}>{'$' + i.amount}</li>)
                            })
                        }
                    </ul>
                </div>
                <div className='div-balance-container'>
                    <ul className='div-balance-ul'>
                        {
                            ingresos.length && ingresos.map(i => {
                                let arr = i.date.split('-')
                                return (<li key={i.id}>{arr[2] + '/' + arr[1] + '/' + arr[0]}</li>)
                            })
                        }
                    </ul>
                </div>
                <div className='div-balance-container'>
                    <ul className='div-balance-ul'>
                        {
                            ingresos.length && ingresos.map(i => {
                                let arr = i;
                                arr.type = 'ingreso';
                                return (
                                    <div key={i.id}>
                                        <button onClick={() => openModal(arr)}>Editar</button>
                                        <button onClick={() => handleDelete(arr)}>Borrar</button>
                                    </div>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>

            <h2>Egresos</h2>

            <div className='div-main-balance div-balance-title-right div-balance-title-left div-balance-margintop'>
                <div className='div-balance-title-left div-balance-title'>Concepto</div>
                <div className=' div-balance-title'>Monto</div>
                <div className='div-balance-title'>Fecha</div>
                <div className='div-balance-title-right div-balance-title'>Opciones</div>

            </div>
            <div className='div-main-balance div-main-balance-border'>
                <div className='div-balance-container'>
                    <ul className='div-balance-ul'>
                        {
                            egresos.length && egresos.map(e => {
                                return (<li key={e.id}>{e.concept}</li>)
                            })
                        }
                    </ul>
                </div>
                <div className='div-balance-container'>
                    <ul className='div-balance-ul'>
                        {
                            egresos.length && egresos.map(e => {
                                return (<li key={e.id}>{'$' + e.amount}</li>)
                            })
                        }
                    </ul>
                </div>
                <div className='div-balance-container'>
                    <ul className='div-balance-ul'>
                        {
                            egresos.length && egresos.map(e => {
                                let arr = e.date.split('-')
                                return (<li key={e.id}>{arr[2] + '/' + arr[1] + '/' + arr[0]}</li>)
                            })
                        }
                    </ul>
                </div>
                <div className='div-balance-container'>
                    <ul className='div-balance-ul'>
                        {
                            egresos.length && egresos.map(e => {
                                let arr = e;
                                arr.type = 'egreso';
                                return (
                                    <div key={e.id}>
                                        <button onClick={() => openModal(arr)}>Editar</button>
                                        <button onClick={() => handleDelete(arr)}>Borrar</button>
                                    </div>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
            <div className='Modal'>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div className="div-balance-title div-abm-title">Modificacion de Operacion</div>
                    <form onSubmit={(e) => handleSubmit(e)} className="div-main-form">

                        <label>Concepto</label>
                        <input name="concept" defaultValue={currentInfo.concept} placeholder="Ingrese el concepto" type='text' onChange={(e) => handleInputModal(e)}></input>
                        <label>Monto</label>
                        <input name="amount" defaultValue={currentInfo.amount} placeholder="Ingrese un monto" type='number' step='0.01' onChange={(e) => handleInputModal(e)}></input>
                        <label>Fecha</label>
                        <input name="date" defaultValue={currentInfo.date} type='date' onChange={(e) => handleInputModal(e)}></input>
                        <button type="submit" className="button-form">Confirmar</button>
                        <button onClick={closeModal} className='button-form'>Cancelar</button>
                    </form>
                </Modal>
            </div>
        </div>
    )
}