import { create } from "zustand";
import api from "../axios/api";

const search = create(set => ({
    searchContent: '',
    
    result: [],

    ok: false,

    handleSearchColaborador: async (query) => {
        try {
            const res = await api.get('/colaborador/search/' + query)
            const data = res.data
            set(() => ({ result: data }))
            set(() => ({ok: true}))
            set(() => ({searchContent: query}))
        } catch (error) {
            console.log(error)
        }
    },

    handleSearchCliente: async (query) => {
        try {
            const res = await api.get('/cliente/search/' + query)
            const data = res.data
            set(() => ({ result: data }))
            set(() => ({ok: true}))
            set(() => ({searchContent: query}))
        } catch (error) {
            console.log(error)
        }
    },

    cleanSearch: () => {
        set(() => ({ok: false}))
    }
}))

export default search