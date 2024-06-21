import React, { useState } from 'react'
import './CSS/Sidebar.css'

export const Sidebar = () => {

    const [selectedOption, setSelected] = useState(null)
    const handleOption = (option)=>{
        setSelected(option)
    }

    return (
        <div className='sidebar'>
            <div className='sidebar-content'>
                <img style={{ width: '12vh', alignSelf: 'center' }} src="https://img.icons8.com/?size=100&id=7819&format=png&color=FFFFFF" />
                <span style={{ textAlign: 'center' }}>Name</span>
                <span style={{ marginLeft: '1vh' }}>Discover</span>
                <a href="/accounts">
                    <img src="https://img.icons8.com/?size=100&id=61747&format=png&color=FFFFFF" alt="" />
                    Cuentas
                </a>
                <a href="">
                    <img src="https://img.icons8.com/?size=100&id=22128&format=png&color=FFFFFF" alt="" />
                    Tarjetas
                </a>
                <a href="/loans">
                    <img src="https://img.icons8.com/?size=100&id=KjlWF_IBGRpu&format=png&color=FFFFFF" alt="" />
                    Préstamos
                </a>
                <span style={{ marginLeft: '1vh' }}>Library</span>
                <a href="">
                    <img src="https://img.icons8.com/?size=100&id=58761&format=png&color=FFFFFF" alt="" />
                    Historial
                </a>
                <a href="">
                    <img src="https://img.icons8.com/?size=100&id=14581&format=png&color=FFFFFF" alt="" />
                    Transferencias
                </a>
                <a href="">
                    <img src="https://img.icons8.com/?size=100&id=215&format=png&color=FFFFFF" alt="" />
                    Pagos
                </a>
            </div>
        </div>
    )
}
