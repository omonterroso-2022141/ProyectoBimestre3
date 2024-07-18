import React, { useEffect, useState } from 'react'
import { Navbar } from '../../Components/Navbar'
import { Sidebar } from '../../Components/Sidebar'
import { Workspace } from '../../Components/Workspace'
import { useParams } from 'react-router-dom'
import { getAccountById } from '../../Services/api'

export const AccountInfo = () => {
    const { uid } = useParams()
    const [account, setAccount] = useState('')

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const response = await getAccountById(uid)
                setAccount(response.data)
            } catch (err) {
                console.log(err);
            }
        }
        fetchAccount()
    }, [uid])

    return (
        <>
            <Navbar />
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <Workspace>
                    <span>Cuenta: {account.account}</span>
                    <br />
                    <span>
                        Saldo: {account.balance && account.balance.$numberDecimal ?
                            parseFloat(account.balance.$numberDecimal).toFixed(2)
                            : 'Saldo no Disponible'
                        }
                    </span>
                    <br />
                    <span>
                        Status: {account.status}
                    </span>
                    <br />
                    <span>
                        Tipo de Cuenta: {account.accountType}
                    </span>
                </Workspace>
            </div>
        </>
    )
}
