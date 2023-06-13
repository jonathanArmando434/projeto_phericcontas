import { Navigate } from "react-router-dom"
import { useEffect } from "react"
import api from "../axios/api"
import loginZustand from "../zustand/login"

const PrivateRoute = ({ children }) => {
    const { authenticated, changeAuthenticated } = loginZustand(state => state)

    

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'))
        if (token) {
            changeAuthenticated(true)
            api.defaults.headers.authorization = `Bearer ${token}`
        }
    }, [])

    return (authenticated ? children : <Navigate to='/admin/entrar' />)
}

export default PrivateRoute