import React from 'react'
import { Navbar } from '../../Components/Navbar'
import { Sidebar } from '../../Components/Sidebar'
import { Workspace } from '../../Components/Workspace'
import Lottie from 'lottie-react'
import checkAnimation from '../../Assets/Animation - 1720164249273.json'

export const History = () => {
    return (
        <>
            <Navbar />
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <Workspace>
                    <h1></h1>
                </Workspace>
            </div>
        </>
    )
}
