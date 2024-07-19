import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginRequest } from "../../Services/api"

export const useLogin = () => {
  const [isLoading, setisLoading] = useState(false)
  const navigate = useNavigate()

  const login = async (username, password) => {
    setisLoading(true)
    const user = {
      username,
      password
    }
    const res = await loginRequest(user)
    setisLoading(false)

    if (res.error) {
      console.log('Error al logearse, cambiar esto por toast o algo !!!', res.err)
      return
    }
    const userDetails = res.data
    localStorage.setItem('username', userDetails.loggedAdmin.name)
    localStorage.setItem('token', userDetails.token)
    navigate('/accounts')
  }
  return{
    login,
    isLoading
  }
}
