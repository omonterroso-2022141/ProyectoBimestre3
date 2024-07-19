import React, { useEffect, useState } from 'react'
import { Navbar } from '../../Components/Navbar'
import { Sidebar } from '../../Components/Sidebar'
import { Workspace } from '../../Components/Workspace'
import { useLoans } from '../../Shared/Hooks/useLoans'
import { makeTransferOwn, updateBalance } from '../../Services/api'
import './OwnAccount.css'

export const OwnAccount = () => {
  const { isLoading, accounts, error, fetchUserAccounts } = useLoans()
  const [transferAmount, setTransferAmount] = useState(0)
  const [selectedAccount, setSelectedAccount] = useState(null)
  const [destination, setDestination] = useState(null)

  useEffect(() => {
    fetchUserAccounts()
  }, [])

  const handleAccountChange = (event) => {
    const account = accounts.find(acc => acc._id === event.target.value)
    setSelectedAccount(account)
  }

  const handleDestination = (event) => {
    const account = accounts.find(acc => acc._id === event.target.value)
    setDestination(account)
  }

  const handleAmmount = async(e)=>{
    const amount = parseFloat(e.target.value)
    setTransferAmount(amount)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (selectedAccount && destination && transferAmount) {
      const response = await makeTransferOwn(selectedAccount._id, destination._id, transferAmount)
      console.log('Res: ',response);
    }
  }

  return (
    <>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <Workspace>
          <form onSubmit={handleSubmit}>
            <span style={{ fontFamily: 'Open Sans', marginLeft: '3vh', fontWeight: 'bold', fontSize: '4vh' }}>Transferencias a Cuentas Propias</span>
            <div className='ownaccount-container'>
              <span style={{ fontFamily: 'Open Sans' }}>Cuenta de Origen:</span>
              <span style={{ fontFamily: 'Open Sans' }}>Saldo:</span>
              <select
                onChange={handleAccountChange}
                name="OwnAccount"
                id="OwnAccount"
                className='select-transfer'
              >
                <option value="">Selecciona una Cuenta</option>
                {accounts.filter(acc => !destination || acc._id !== destination._id).map((acc) => (
                  <option key={acc._id} value={acc._id}>
                    {acc.account}
                  </option>
                ))}
              </select>

              <span style={{ fontFamily: 'Open Sans', fontWeight: 'bold' }}>GTQ. {selectedAccount ? selectedAccount.balance.toFixed(2) : 'Saldo no Disponible'}</span>
              <span style={{ fontFamily: 'Open Sans' }}>Cuenta de Destino:</span>
              <span style={{ fontFamily: 'Open Sans' }}>Monto:</span>

              <select
                onChange={handleDestination}
                name="OtherAccount"
                id="OtherAccount"
                className='select-transfer'
              >
                <option value="">Seleccione una Cuenta para Transferir</option>
                {accounts.filter(acc => !selectedAccount || acc._id !== selectedAccount._id).map((acc) => (
                  <option key={acc._id} value={acc._id}>
                    {acc.account}
                  </option>
                ))}
              </select>

              <input
                type="number"
                min={2}
                max={2000}
                onChange={handleAmmount}
              />
            </div>
            <div className='transfer-description'>
              <span style={{ fontFamily: 'Open Sans' }}>Descripción (opcional):</span>
              <textarea name="" id=""></textarea>
            </div>
            <input
              type="submit"
              value="Siguiente"
              className='next-button'
            />
          </form>
        </Workspace>
      </div>
    </>
  )
}
