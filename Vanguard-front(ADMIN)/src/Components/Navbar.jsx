import React from 'react'
import './CSS/Navbar.css'
import { useNavigate } from 'react-router-dom'

export const Navbar = () => {
    const navigate = useNavigate()
    const navigateToHomePage=()=>{
        navigate('/')
    }
    return (
        <>
            <ul className='NavbarBody'>
                <span onClick={navigateToHomePage} style={{color:'white', marginRight:'10%', fontFamily:'Open Sans', fontWeight:'bold', fontSize:'2.5vh', cursor:'pointer'}}>VANGUARD</span>
            </ul>
        </>
    )
}
