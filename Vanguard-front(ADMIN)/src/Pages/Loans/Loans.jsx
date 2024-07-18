import { useState, useEffect } from 'react'
import { Navbar } from '../../Components/Navbar'
import { Sidebar } from '../../Components/Sidebar'
import { Workspace } from '../../Components/Workspace'
import { useLoans } from '../../Shared/Hooks/useLoans'
import { useNavigate } from 'react-router-dom'
import { updateBalance } from '../../Services/api'
import './Loans.css'

export const Loans = () => {
  const [loanAmount, setloanAmount] = useState(1)
  const { isLoading, accounts, error, fetchUserAccounts } = useLoans()
  const [selectedAccount, setSelectedAccount] = useState(null)
  const [requestedAmount, setRequestedAmount] = useState(0)

  const navigate = useNavigate()
  const navigateToVoucher = () => {
    navigate('/loanvoucher')
  }

  useEffect(() => {
    fetchUserAccounts()
  }, []);

  //# Month Range
  const handleRangeChange = (event) => {
    setloanAmount(parseInt(event.target.value))
  }

  //# Account Selected
  const handleAccountChange = (event) => {
    const account = accounts.find(acc => acc._id === event.target.value)
    setSelectedAccount(account)
  }

  const handleAmmountChange = (e) => {
    const amount = parseFloat(e.target.value)
    setRequestedAmount(amount)
  }

  const digitalPayment = () => {
    const interest = 0.05
    const interestAmount = requestedAmount * interest
    const totalPayment = requestedAmount + interestAmount
    return totalPayment.toFixed(2)
  }

  const monthlyPayment = () => {
    const calDigitalPayment = digitalPayment()
    const monthlyPayment = calDigitalPayment / loanAmount
    return monthlyPayment.toFixed(2)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (selectedAccount) {
      const newBalance = selectedAccount.balance + requestedAmount
      const response = await updateBalance(selectedAccount._id, newBalance)
      if (response.error) {
        console.error(response.err);
      } else {
        console.log('Monto solicitado: ', requestedAmount);
        console.log('Meses', loanAmount);
        console.log('Saldo de Cuenta actualiado: ', response);
        fetchUserAccounts()
        navigateToVoucher()
      }
    }
  }

  return (
    <>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <Workspace>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '60vh 50vh' }}>
              <span className='header'>Cuenta:</span>
              <span className='header'>Saldo</span>
              <select
                name="accounts"
                id="accounts"
                style={{ width: '30vh', height: '2em' }}
                onChange={handleAccountChange}
              >
                <option value="">Selecciona una Cuenta</option>
                {accounts.map((acc) => {
                  return (
                    <option key={acc._id} value={acc._id}>
                      {acc.account}
                    </option>
                  )
                })}
              </select>
              <span className='header'>
                GTQ: {selectedAccount ? selectedAccount.balance.toFixed(2) : 'Saldo no Disponible'}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '30vh 20vh' }}>
              <span className='title'>¿Cuánto dinero necesitas?</span>
              <span className='title'>Pago Mensual</span>
              <input
                style={{ width: '10vh', fontSize: 'medium' }}
                type="number"
                name=""
                id=""
                min={1}
                onChange={handleAmmountChange}
              />
              <label>{monthlyPayment()}</label>
            </div>

            <div>
              <span>¿En cuanto tiempo quieres pagarlo?</span>
              <br />
              <input style={{ width: '30vh' }} type="range" min="1" max="12" value={loanAmount} onChange={handleRangeChange} name="" id="range" />
              <br />
              <span>Meses: <span id='value'>{loanAmount}</span></span>
            </div>

            <div>
              <span>Si pagas puntual, tu pago digital será de</span>
              <span>{digitalPayment()}</span>
            </div>
            <input type="submit" value="Continuar" />
          </form>
        </Workspace>
      </div>
    </>
  )
}
