import { useState } from "react";
import toast from 'react-hot-toast';
import { getTransfers } from "../../Services/api";

export const useTransfers = () => {
    const [transfers, setTransfers] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchTransfers = async () => {
        setIsLoading(true);
        try {
            const response = await getTransfers();
            if (response.error) {
                setError('Error al obtener transferencias');
                toast.error('Error al obtener transferencias');
            } else {
                setTransfers(response.data.transfers || []);
            }
        } catch (err) {
            console.error('Error al obtener transferencias:', err);
            setError('Error al obtener transferencias. Inténtalo de nuevo');
            toast.error('Error al obtener transferencias. Inténtalo de nuevo');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        transfers,
        error,
        fetchTransfers
    };
};
