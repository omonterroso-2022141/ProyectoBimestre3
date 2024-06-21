import React from 'react'
import { Login } from '../../Components/Login.jsx'
import { Navbar } from '../../Components/Navbar'
import './HomePage.css'

export const HomePage = () => {
    return (
        <div className='home-body'>
            <Navbar />
            <Login />
            <br />
            <br />
            <div>
                <img className='padlock-img' src="https://img.icons8.com/?size=300&id=93&format=png&color=FFFFFF" alt="" />
                <br />
                <span className='info-text'>¡ No Caigas En Engaños !</span>
                <br />
                <span className='info-text'>Siempre visita nuestra página Oficial</span>
                <br />
                <div className='oficial-link'>
                    <a href="#">HTTP://www.vanguard.gt/</a>
                </div>
            </div>
        </div>
    )
}
