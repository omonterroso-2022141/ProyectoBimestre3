import React from 'react'
import { Navbar } from '../../Components/Navbar'
import { Sidebar } from '../../Components/Sidebar'
import { Workspace } from '../../Components/Workspace'

export const Payments = () => {
    return (
        <>
            <Navbar />
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <Workspace>
                    <div>Payments</div>
                </Workspace>
            </div>
        </>
    )
}
