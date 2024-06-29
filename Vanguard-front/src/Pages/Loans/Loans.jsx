import {useState} from 'react'
import { Navbar } from '../../Components/Navbar'
import { Sidebar } from '../../Components/Sidebar'
import { Workspace } from '../../Components/Workspace'
import './Loans.css'

export const Loans = () => {

  const [loanAmount, setloanAmount] = useState(1)
  const handleRangeChange = (event)=>{
    setloanAmount(event.target.value)
  }

  return (
    <>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <Workspace>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span className='header'>Saldo</span>
            <span className='header'>Q. 7,500.00</span>
          </div>

          <div style={{display:'grid', gridTemplateColumns:'30vh 20vh'}}>
            <span className='title'>¿Cuánto dinero necesitas?</span>
            <span className='title'>Pago Mensual</span>
            <input style={{width:'10vh', fontSize:'medium'}} type="number" name="" id="" />
            <label>Q. 1,050.00</label>
          </div>

          <div>
            <span>¿En cuanto tiempo quieres pagarlo?</span>
            <br />
            <input style={{width:'30vh'}} type="range" min="1" max="12" value={loanAmount} onChange={handleRangeChange} name="" id="range" />
            <br />
            <span>Meses: <span id='value'>{loanAmount}</span></span>
          </div>

          <div>
            <span>Si pagas puntual, tu pago digital será de</span>
            <span>Q. 5,250.00</span>
          </div>
          <input type="submit" value="Continuar" />
        </Workspace>
      </div>
    </>
  )
}
