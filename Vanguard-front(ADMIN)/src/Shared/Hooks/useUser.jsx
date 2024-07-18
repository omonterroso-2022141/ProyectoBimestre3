import { useState } from "react"
import { getUserDataToken } from "../../Services/api"

export const useUser = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [userInfo, setUserInfo] = useState(null)
    const [error, setError] = useState(null)

    const getUserData = async () => {
        setIsLoading(true)
        try {
            const response = await getUserDataToken()
            if (response.data) {
                setUserInfo(response.data)
            } else {
                setError('Error al Obtener Datos')
            }
        } catch (error) {
            setIsLoading(false)
            setError('Error al Obtener Datos')
            console.error(error)
        }
    }
    return {
        isLoading,
        userInfo,
        error,
        getUserData,
    }
}
