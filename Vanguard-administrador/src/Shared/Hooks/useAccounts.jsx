import {useState} from 'react'
import { getAccounts } from '../../Services/api'

export const useAccounts = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [accounts, setAccounts] = useState(null)
    const [error, setError] = useState(null)

    const getUserAccounts = async () => {
        setIsLoading(true)
        try {
            const response = await getAccounts();
            if(response.data){
                setAccounts(response.data.accounts)
            }else{
                setError('No se Encontraron Cuentas')
            }
        } catch (error) {
            console.error('Error al obtener cuentas:', error);
            setError('Error al obtener Cuentas. Intentalo de nuevo')
        }finally{
            setIsLoading(false)
        }
    }
    return{
        isLoading,
        accounts,
        error,
        getUserAccounts
    }
}
