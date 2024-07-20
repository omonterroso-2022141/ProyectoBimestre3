import { useEffect } from 'react';
import { Navbar } from '../../Components/Navbar';
import { Sidebar } from '../../Components/Sidebar';
import { Workspace } from '../../Components/Workspace';
import { useTransfers } from '../../Shared/Hooks/useTransacctions';

export const History = () => {
    const { isLoading, transfers, error, fetchTransfers } = useTransfers();

    useEffect(() => {
        fetchTransfers();
    }, []);

    return (
        <>
            <Navbar />
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <Workspace>
                    <div className='transfers'>
                        {isLoading ? (
                            <p>Cargando Transferencias...</p>
                        ) : error ? (
                            <p>Error: {error}</p>
                        ) : transfers && transfers.length > 0 ? (
                            transfers.map((transfer, index) => (
                                <div key={transfer._id} className='transfer-card'>
                                    <div className='transfer-content'>
                                        <span>ID Transferencia</span>
                                        <span>{transfer._id}</span>
                                        <span>De</span>
                                        <span>{transfer.fromAccount}</span>
                                        <span>Para</span>
                                        <span>{transfer.toAccount}</span>
                                        <span>Monto</span>
                                        <span>
                                            {transfer.amount && transfer.amount.$numberDecimal ?
                                                parseFloat(transfer.amount.$numberDecimal).toFixed(2)
                                                : 'Monto no Disponible'
                                            }
                                        </span>
                                        <span>Fecha</span>
                                        <span>{new Date(transfer.date).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No se encontraron transferencias</p>
                        )}
                    </div>
                </Workspace>
            </div>
        </>
    );
};
