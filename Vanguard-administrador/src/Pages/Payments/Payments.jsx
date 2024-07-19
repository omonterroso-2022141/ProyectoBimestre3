import React from 'react'
import { Navbar } from '../../Components/Navbar'
import { Sidebar } from '../../Components/Sidebar'
import { Workspace } from '../../Components/Workspace'
import './Payments.css'

export const Payments = () => {
    return (
        <>
            <Navbar />
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <Workspace>
                    <h1>Compra con VALORANT Points</h1>
                    <div className='card-container' style={{display:'flex'}}>
                        <div className='card-promotion'>
                            <img style={{width:'25vh'}} src="https://i.ibb.co/5RrCN11/image-removebg-preview-1.png"/>
                            <span style={{fontSize:'3vh'}}>Alitas Campero</span>
                            <br />
                            <span style={{fontSize:'1.4vh'}}>Descuento de Q50.00 al Canjear este Cupon.</span>
                            <br />
                            <span style={{fontSize:'3vh'}}>Q150.00</span>
                            <br />
                            <br />
                            <button style={{marginBottom:'1vh', height:'3vh', width:'15vh', backgroundColor:'black', color:'white', border:'none', fontWeight:'bold', fontSize:'2vh'}}>Canjear</button>
                        </div>
                    </div>
                </Workspace>
            </div>
        </>
    )
}
