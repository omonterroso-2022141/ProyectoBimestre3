import { useState } from 'react'
import { useLogin } from '../Shared/Hooks/useLogin'
import './CSS/Login.css'
import { useNavigate } from 'react-router-dom'

export const Login = ({ switchAuthHandler }) => {
    const { login, isLoading } = useLogin()
    const [formData, setformData] = useState({
        username: {
            value: '',
        },
        password: {
            value: ''
        }
    })

    const navigate = useNavigate()

    const onChangeValue = (e) => {
        const {name, value} = e.target
        setformData((prevData)=>(
            {
                ...prevData,
                [name]:{
                    ...prevData[name],
                    value
                }
            }
        ))
    }

    const handleValidationOnBlur = (field) => {
        let isValid = false
        switch (field) {
            case 'username':
                console.log(username.value);
                break
            case 'password':
                console.log(password.value);
                break
            default:
                break
        }
        setformData((prevData) => (
            {
                ...prevData,
                [field]: {
                    ...prevData[field],
                }
            }
        ))
    }

    const navigateToAdelante=()=>{
        navigate('/accounts')
    }

    const handleLogin = (e) => {
        e.preventDefault()
        login(
            formData.username.value,
            formData.password.value
        )
    }

    return (
        <>
            <div className='card'>
                <div className='card-content'>
                    <form onSubmit={handleLogin}>
                        <span>Usuario</span>
                        <input
                            type="text"
                            name='username'
                            value={formData.username.value}
                            onChange={onChangeValue}
                            style={{ height: '20px', fontWeight: 'bold' }}
                        />
                        <br />

                        <span>Contraseña</span>
                        <input
                            type="password"
                            name='password'
                            value={formData.password.value}
                            onChange={onChangeValue}
                            style={{ height: '20px', fontWeight: 'bold' }}
                        />
                        <button onClick={navigateToAdelante}>adelante</button>
                        <input type="submit" value="Iniciar Sesión" />
                    </form>
                </div>
            </div>
        </>
    )
}
