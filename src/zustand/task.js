import { create } from "zustand";

const task = create(set => ({
    open: false,

    about: '',

    post: true,

    id_responsavel: '',

    id_cliente: '',

    members: [],

    clients: [],

    setOpen: (open) => {
        set(() => ({open: open}))
    },

    setAbout: (about) => {
        set(() => ({ about: about }))
    },

    setPost: (post) => {
        set(() => ({post: post}))
    },

    setIdResponsavel: (id_responsavel) => {
        set(() => ({ id_responsavel: id_responsavel }))
    },

    setIdCliente: (id_cliente) => {
        set(() => ({ id_cliente: id_cliente }))
    },

    setMembers: (members) => {
        set(() => ({ members: members }))
    },

    setClients: (clients) => {
        set(() => ({ clients: clients }))
    },
}))

export default task