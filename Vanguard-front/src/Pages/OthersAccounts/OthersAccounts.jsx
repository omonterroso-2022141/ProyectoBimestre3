import React, { useEffect, useState } from 'react'
import { Navbar } from '../../Components/Navbar'
import { Sidebar } from '../../Components/Sidebar'
import { Workspace } from '../../Components/Workspace'
import { useThirdPAccounts } from '../../Shared/Hooks/useThirdPAccounts'
import { Link } from 'react-router-dom'
import '../Accounts/Accounts.css'

export const OthersAccounts = () => {

    const { isLoading, accounts, error, getTPAccounts } = useThirdPAccounts()
    const [updateFav, setUpdateFav] = useState([])

    const handleFavorite = (accountId) => {
        console.log('hola');
        const updated = accounts.map((account) => {
            if (account._id === accountId) {
                return { ...account, favorite: !account.favorite }
            }
            return account
        })
        console.log(updated);
        setUpdateFav(updated)
    }

    useEffect(() => {
        getTPAccounts()
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
                                <Link key={index}>
                                    <div className='account-card'>
                                        <div className='account-content'>
                                            <span>Alias: </span>
                                            <span>{account.alias}</span>
                                            <span>Tipo: </span>
                                            <span>{account.accountType}</span>
                                            <span>No. Cuenta: </span>
                                            <span>{account.account}</span>
                                            <span></span>
                                            <div onClick={() => handleFavorite(account._id)}>
                                                {account.favorite ? (
                                                    <img
                                                        src="https://img.icons8.com/?size=30&id=84925&format=png&color=383838"
                                                        style={{ marginLeft: '8vh' }}
                                                    />
                                                ) : (
                                                    <img
                                                        src="https://img.icons8.com/?size=30&id=85784&format=png&color=383838"
                                                        style={{ marginLeft: '8vh' }}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p>No se Encontraron Cuentas</p>
                        )}
                    </div>
                </Workspace>
            </div>
        </>
    )
}
