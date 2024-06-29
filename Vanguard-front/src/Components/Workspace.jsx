import React from 'react'
import './CSS/Workspace.css'

export const Workspace = ({children}) => {
    return (
        <div className='workspace'>
            {children}
        </div>
    )
}
