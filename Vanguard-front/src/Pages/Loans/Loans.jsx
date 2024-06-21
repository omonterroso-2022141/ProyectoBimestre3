import React from 'react'
import { Navbar } from '../../Components/Navbar'
import { Sidebar } from '../../Components/Sidebar'

export const Loans = () => {
  return (
    <>
    <Navbar/>
    <div style={{display:'flex'}}>
        <Sidebar/>
        Préstamos :D
    </div>
    </>
  )
}
