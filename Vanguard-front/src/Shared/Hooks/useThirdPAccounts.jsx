import { useState } from "react"
import { getThirdPAccunts } from "../../Services/api"


export const useThirdPAccounts = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [accounts, setAccounts] = useState(null)
    const [error, setError] = useState(null)

    const getTPAccounts = async () => {
        setIsLoading(true)
        try {
            const response = await getThirdPAccunts()
            if (response.data) {
                setAccounts(response.data)
            } else {
                setError('No se Encontraron Cuentas de Terceros')
            }
        } catch (error) {
            console.error(error)
            setError('Error al Obtener Cuentas de Terceros', error)
        } finally {
            setIsLoading(false)
        }
    }
    return {
        isLoading,
        accounts,
        error,
        getTPAccounts
    }
}
