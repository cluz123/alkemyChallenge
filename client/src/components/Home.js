import React from 'react';
import '../styles/Home.css'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInfo } from '../actions';
import Navbar from './Navbar';



export default function Home() {
    const dispatch = useDispatch();
    const ingresos = useSelector(state => state.ingresos);
    const egresos = useSelector(state => state.egresos);

    useEffect(() => {
        dispatch(getInfo());
    }, [dispatch]);

    let sumIngresos = 0;
    ingresos.length && ingresos.map(i => {
        sumIngresos = sumIngresos + i.amount;
    });
    let sumEgresos = 0;
    ingresos.length && egresos.map(e => {
        sumEgresos = sumEgresos + e.amount;
    });
    let total = sumIngresos - sumEgresos;

    return (
        <div className='div-main-home'>
            <Navbar />
            <h2>Ultimos Registros</h2>
            <div className='div-main-balance div-balance-title-right div-balance-title-left'>
                <div className='div-balance-title-left div-balance-title'>Ingresos</div>
                <div className='div-balance-title-right div-balance-title'>Egresos</div>
            </div>
            <div className='div-main-balance div-main-balance-border'>
                <div className='div-balance-container'>
                    <ul className='div-balance-ul'>
                        {
                            ingresos.length && ingresos?.slice(ingresos.length-10, ingresos.length).map(i => {
                                return (<li key={i.id}>{'$' + i.amount}</li>)
                            })
                        }
                    </ul>
                </div>
                <div className='div-balance-container'>
                    <ul className='div-balance-ul'>
                        {
                            egresos.length && egresos?.slice(egresos.length-10, egresos.length).map(e => {
                                return (<li key={e.id}>{'$' + e.amount}</li>)
                            })
                        }
                    </ul>
                </div>
            </div>
            <div className='div-container-total'>
                <div className='div-main-balance  div-balance-title-right div-balance-title-left div-balance-margintop div-responsive'>
                    <div className='div-balance-title-left div-balance-title div-balance-title-responsive'>Ingresos totales</div>
                    <div className='div-balance-title div-balance-title-responsive'>Egresos totales</div>
                    <div className='div-balance-title-right div-balance-title div-balance-title-responsive'>Balance   total</div>
                </div>
                <div className='div-main-balance div-main-balance-border div-responsive'>
                    <div className='div-balance-container div-balance-container-responsive'>{'$' + sumIngresos}</div>
                    <div className='div-balance-container div-balance-container-responsive'>{'$' + sumEgresos}</div>
                    <div className='div-balance-container div-balance-container-responsive'>{'$' + total}</div>
                </div>
            </div>
        </div>
    )
}