import React from 'react'
import { Navbar } from '../../Components/Navbar'
import { Sidebar } from '../../Components/Sidebar'
import { Workspace } from '../../Components/Workspace'
import './Accounts.css'

export const Accounts = () => {
    return (
        <>
            <Navbar />
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <Workspace>
                    <div className='accounts'>
                        <div className='account-card'>
                            <div className='account-content'>
                                <span>No. Cuenta</span>
                                <span>0123456789</span>
                                <span>Tipo</span>
                                <span>Ahorro</span>
                                <span>Moneda</span>
                                <span>GTQ</span>
                                <span>Saldo</span>
                                <span>7,000.00</span>
                            </div>
                        </div>
                    </div>
                </Workspace>
            </div>
        </>
    )
}
