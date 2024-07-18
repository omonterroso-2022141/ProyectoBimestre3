import { useEffect, useState } from "react"
import { getAccounts } from "../../Services/api"

export const useLoans = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [accounts, setAccounts] = useState([])
    const [error, setError] = useState(null)

    const fetchUserAccounts = async () => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await getAccounts()
            const normalizedAccounts = response.data.accounts.map(account => ({
                ...account,
                balance: account.balance.$numberDecimal ? parseFloat(account.balance.$numberDecimal) : 0
            }));
            setAccounts(normalizedAccounts)
        } catch (err) {
            setError(err.message || 'Error al Cargar Cuentas')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchUserAccounts()
    }, [])
    return {
        isLoading,
        accounts,
        error,
        fetchUserAccounts
    }
}