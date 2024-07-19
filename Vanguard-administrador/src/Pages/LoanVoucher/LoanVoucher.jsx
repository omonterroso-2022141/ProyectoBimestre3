import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Navbar } from "../../Components/Navbar"
import { Sidebar } from "../../Components/Sidebar"
import { Workspace } from "../../Components/Workspace"
import Lottie from "lottie-react"
import checkAnimation from '../../Assets/Animation - 1720164249273.json'
import './LoanVoucher.css'

export const LoanVoucher = () => {
    const [username, setUsername] = useState('')

    const navigate = useNavigate()
    const navigateToAccounts = ()=>{
        navigate('/accounts')
    }

    useEffect(() => {
        const storedUsername = localStorage.getItem('username')
        setUsername(storedUsername || '')
    }, [])

    return (
        <>
            <Navbar />
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <Workspace>
                    <Lottie
                        loop={false}
                        animationData={checkAnimation}
                        style={{ height: '40vh' }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                        <span className="congratulations">¡ Felicidades, {username} !</span>
                        <span className="voucher-text">Tu credito ha sido Depositado en tu Cuenta</span>
                        <span className="voucher-text">¡ Usalo cuando Quieras !</span>
                        <button onClick={navigateToAccounts} className="button-voucher">Guardar Comprobante</button>
                    </div>
                </Workspace>
            </div>
        </>
    )
}
