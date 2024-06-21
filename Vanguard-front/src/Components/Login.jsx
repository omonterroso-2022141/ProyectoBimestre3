import React from 'react'
import './CSS/Login.css'
import { useNavigate } from 'react-router-dom'

export const Login = () => {

    const navigate = useNavigate()
    const navigateToAccounts = ()=>{
        navigate('/accounts')
    }

    return (
        <>
            <div className='card'>
                <div className='card-content'>
                    <span>Usuario</span>
                    <input style={{height:'20px', fontWeight:'bold'}} type="text" name="" id="" />
                    <br />
                    <span>Contraseña</span>
                    <input style={{height:'20px', fontWeight:'bold'}} type="password" name="" id="" />
                    <input type="button" value="Iniciar Sesión" onClick={navigateToAccounts}/>
                </div>
            </div>
        </>
    )
}
