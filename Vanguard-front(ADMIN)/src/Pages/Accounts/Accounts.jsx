import { useEffect, useState } from 'react'
import { Navbar } from '../../Components/Navbar'
import { Sidebar } from '../../Components/Sidebar'
import { Workspace } from '../../Components/Workspace'
import { useAccounts } from '../../Shared/Hooks/useAccounts'
import { Link } from 'react-router-dom'
import './Accounts.css'

export const Accounts = () => {
    const { isLoading, accounts, error, getUserAccounts } = useAccounts()

    useEffect(() => {
        getUserAccounts()
    }, [])

    return (
        <>
            <Navbar />
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <Workspace>
                    <div className='accounts'>
                        {isLoading ? (
                            <p>Cargando Cuentas...</p>
                        ) : error ? (
                            <p>Error: {error}</p>
                        ) : accounts && accounts.length > 0 ? (
                            accounts.map((account, index) => (
                                <Link to={`/accounts/${account._id}`} key={account._id}>
                                    <div className='account-card'>
                                        <div className='account-content'>
                                            <span>No. Cuenta</span>
                                            <span>{account.account}</span>
                                            <span>Tipo</span>
                                            <span>{account.accountType}</span>
                                            <span>Moneda</span>
                                            <span>GTQ</span>
                                            <span>Saldo</span>
                                            <span>
                                                {account.balance && account.balance.$numberDecimal ?
                                                    parseFloat(account.balance.$numberDecimal).toFixed(2)
                                                    : 'Saldo no Disponible'
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p>No se Encontaron cuentas</p>
                        )}
                    </div>
                </Workspace>
            </div>
        </>
    )
}
