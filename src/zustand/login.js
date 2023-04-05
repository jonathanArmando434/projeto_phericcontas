import { create } from "zustand";
import api from "../axios/api";

const login = create(set => ({
    authenticated: true,

    loading: false,

    handleLogin: async (loginDtas, rememberMe) => {
        try {
            const res = await api.post('/login', loginDtas)
            const data = res.data
            if (rememberMe) localStorage.setItem('token', JSON.stringify(data.token))
            set(() => ({ authenticated: true }))
            api.defaults.headers.authorization = `Bearer ${data.token}`
            return data.message
        } catch (error) {
            const errorMessage = error.response && error.response.data.message
            if (errorMessage) return errorMessage
            return
        }
    },

    handleLogout: () => {
        localStorage.removeItem('token')
        set(() => ({ authenticated: false }))
    },

    changeLoading: () => (set(state => ({ loading: !state.loading }))),

    changeAuthenticated: (newValue) => (set(() => ({ authenticated: newValue }))),
}))

export default login