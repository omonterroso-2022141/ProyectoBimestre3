import { useEffect } from "react"
import { Navbar } from "../../Components/Navbar"
import { Sidebar } from "../../Components/Sidebar"
import { Workspace } from "../../Components/Workspace"
import { useUser } from "../../Shared/Hooks/useUser"

export const UserInfo = () => {

    const { error, getUserData, isLoading, userInfo } = useUser()

    useEffect(() => {
        getUserData()
    }, [])

    return (
        <>
            <Navbar />
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <Workspace>
                    {userInfo && (
                        <div style={{display: 'grid'}}>
                            <span>Nombre: {userInfo.name}</span>
                            <span>Apellido: {userInfo.surname}</span>
                            <span>Nombre de Usuario: {userInfo.username}</span>
                            <span>DPI: {userInfo.DPI}</span>
                            <span>Residencia: {userInfo.address}</span>
                            <span>Teléfono: {userInfo.phone}</span>
                            <span>Email: {userInfo.email}</span>
                            <span>Trabajo: {userInfo.job}</span>
                            <span>Sueldo: GTQ {userInfo.income}</span>
                        </div>
                    )}
                </Workspace>
            </div>
        </>
    )
}
