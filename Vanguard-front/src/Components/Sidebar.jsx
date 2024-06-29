import React, { useEffect, useState } from 'react'
import './CSS/Sidebar.css'
import { useNavigate } from 'react-router-dom'

export const Sidebar = () => {

    const [selectedOption, setSelectedOption] = useState('')
    const [transferOptions, setTransferOptions] = useState(false)

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value)
        if (event.target.value === 'transfer') {
            setTransferOptions(!transferOptions)
        } else {
            setTransferOptions(false)
        }
    }
    useEffect(() => {
        const currentPage = window.location.pathname
        if (currentPage === '/loans') {
            setSelectedOption('loans')
        } else if (currentPage === '/ownaccounts') {
            setSelectedOption('ownAccounts')
            setTransferOptions(true)
        } else if (currentPage === '/othersaccounts') {
            setSelectedOption('othersAccounts')
            setTransferOptions(true)
        }else if(currentPage === '/payments'){
            setSelectedOption('payments')
        }else if(currentPage === '/history'){
            setSelectedOption('history')
        }else if(currentPage === '/accounts'){
            setSelectedOption('accounts')
        }
    }, [])

    const navigate = useNavigate()
    const navigateToLoans = () => {
        navigate('/loans')
    }
    const navigateToAccounts = () => {
        navigate('/accounts')
    }

    const navigateOwnAccounts = () => {
        navigate('/ownaccounts')
    }

    const navigateOthersAccounts = () => {
        navigate('/othersaccounts')
    }

    const navigateToPayments = () => {
        navigate('/payments')
    }

    const navigateToHistory = () =>{
        navigate('/history')
    }

    return (
        <div className='sidebar'>
            <div className='sidebar-content'>
                <img style={{ width: '12vh', alignSelf: 'center' }} src="https://img.icons8.com/?size=100&id=7819&format=png&color=FFFFFF" />
                <span style={{ textAlign: 'center' }}>Name</span>
                <span style={{ marginLeft: '1vh' }}>Discover</span>

                <label onClick={navigateToAccounts} style={{ backgroundColor: selectedOption === 'accounts' ? '#76ABAE' : '' }}>
                    <input type="radio" value="accounts" checked={selectedOption === 'accounts'} onChange={handleOptionChange} />
                    <img src="https://img.icons8.com/?size=30&id=61747&format=png&color=FFFFFF" alt="" />
                    <span>Cuentas</span>
                </label>

                <label onClick={navigateToLoans} style={{ backgroundColor: selectedOption === 'loans' ? '#76ABAE' : '' }}>
                    <input type="radio" value="loans" checked={selectedOption === 'loans'} onChange={handleOptionChange} />
                    <img src="https://img.icons8.com/?size=30&id=KjlWF_IBGRpu&format=png&color=FFFFFF" alt="" />
                    <span>Préstamos</span>
                </label>

                <span style={{ marginLeft: '1vh' }}>Library</span>

                <label onClick={navigateToHistory} style={{ backgroundColor: selectedOption === 'history' ? '#76ABAE' : '' }}>
                    <input type="radio" value="history" checked={selectedOption === 'history'} onChange={handleOptionChange}/>
                    <img src="https://img.icons8.com/?size=30&id=58761&format=png&color=FFFFFF" alt="" />
                    <span>Historial</span>
                </label>

                <label style={{ backgroundColor: (selectedOption === 'transfer' || selectedOption === 'ownAccounts' || selectedOption === 'othersAccounts') ? '#76ABAE' : '' }}>
                    <input type="radio" value="transfer" checked={selectedOption === 'transfer'} onChange={handleOptionChange} />
                    <img src="https://img.icons8.com/?size=30&id=14581&format=png&color=FFFFFF" alt="" />
                    <span>Transferencias</span>
                </label>
                {transferOptions && (
                    <>
                        <label onClick={navigateOwnAccounts} style={{ marginLeft: '2em', backgroundColor: selectedOption === 'ownAccounts' ? '#F69021' : '' }}>
                            <input type="radio" value="ownAccounts" checked={selectedOption === 'ownAccounts'} onChange={handleOptionChange} />
                            <img src="https://img.icons8.com/?size=30&id=11727&format=png&color=FFFFFF" alt="" />
                            <span>Cuentas Propias</span>
                        </label>

                        <label onClick={navigateOthersAccounts} style={{ marginLeft: '2em', backgroundColor: selectedOption === 'othersAccounts' ? '#F69021' : '' }}>
                            <input type="radio" value="othersAccounts" checked={selectedOption === 'othersAccounts'} onChange={handleOptionChange} />
                            <img src="https://img.icons8.com/?size=30&id=117375&format=png&color=FFFFFF" alt="" />
                            <span>Cuentas de Terceros</span>
                        </label>
                    </>
                )}
                <label onClick={navigateToPayments} style={{ backgroundColor: selectedOption === 'payments' ? '#76ABAE' : '' }}>
                    <input type="radio" value="payments" checked={selectedOption === 'payments'} onChange={handleOptionChange} />
                    <img src="https://img.icons8.com/?size=30&id=215&format=png&color=FFFFFF" alt="" />
                    <span>Pagos</span>
                </label>
            </div>
        </div>
    )
}
