import { create } from "zustand";
import api from "../axios/api";
import validator from 'email-validator'

let errorMsg = ''

const verifyDatas = async (client) => {
    const {
        nif,
        nome,
        area_negocio,
        telefone,
        email,
        data_inicio,
        data_fim,
        localizacao,
    } = client

    if (!nif) {
        errorMsg = 'Preencha o campo do NIF'
        return false
    }

    if (!nome) {
        errorMsg = 'Preencha o campo do nome'
        return false
    }

    if (!area_negocio) {
        errorMsg = 'Preencha o campo da área de negócio'
        return false
    }

    if (!telefone || telefone.length === 0) {
        errorMsg = 'O telefone/WhatsApp é obrigatório'
        return false
    }

    if (!email) {
        errorMsg = 'Preencha o campo do e-mail'
        return false
    }

    if (!validator.validate(email)) {
        errorMsg = 'E-mail inválido'
        return false
    }

    if (!data_inicio) {
        errorMsg = 'A data de início do contrato é obrigatório'
        return false
    }

    if (!data_fim) {
        errorMsg = 'A data de fim do contrato é obrigatório'
        return false
    }

    if (localizacao.length === 0) {
        errorMsg = 'O endereço é obrigatório!'
        return false
    }

    return true
}

const redoPosts = async (client, id_contact, id_contract, localIDs) => {
    await api.delete(`/cliente/${client.id_cliente}`)
    await api.delete(`/contato-cliente/${id_contact}`)
    await api.delete(`/contrato/${id_contract}`)
}

const addClient = async (client) => {
    try {
        const formData = new FormData()
        for(const key in client) formData.append(key, client[key])
        const res = await api.post('/cliente', formData)
        const data = res.data
        return { msg: data.message, id_cliente: data.result._id || '' }
    } catch (error) {
        const errorMessage = error.response && error.response.data.message
        if (errorMessage) return { msg: errorMessage }
        return {}
    }
}

const addClientContact = async (client) => {
    try {
        const res = await api.post('/contato-cliente', client)
        const data = res.data
        return { msgContact: data.message || '', id_contact: data.result._id || '' }
    } catch (error) {
        console.log(error)
        await api.delete(`/cliente/${client.id_cliente}`)
        const errorMessage = error.response && error.response.data.message
        if (errorMessage) return { msgContact: errorMessage }
        return {}
    }
}

const addClientContract = async (client, id_contact) => {
    try {
        let res = await api.post('/contrato', client)
        const data = res.data
        return { msgContract: data.message || '', id_contract: data.result._id || '' }
    } catch (error) {
        await api.delete(`/cliente/${client.id_cliente}`)
        await api.delete(`/contato-cliente/${id_contact}`)
        const errorMessage = error.response && error.response.data.message
        if (errorMessage) return { msgContract: errorMessage }
        return {}
    }
}

const editClient = async (client, id) => {
    try {
        const res = await api.patch(`/cliente/${id}`, client)
        const data = res.data
        return data.message
    } catch (error) {
        const errorMessage = error.response && error.response.data.message
        if (errorMessage) return errorMessage
        return
    }
}

const editClientContact = async (client, backup, id) => {
    try {
        const res = await api.patch(`/contato-cliente/${id}`, client)
        const data = res.data
        return data.message
    } catch (error) {
        console.log(error)
        await api.patch(`/cliente/${id}`, backup.cliente)
        const errorMessage = error.response && error.response.data.message
        if (errorMessage) return errorMessage
        return
    }
}

const editClientContract = async (client, backup, id) => {
    try {
        let res = await api.patch(`/contrato/${id}`, client)
        const data = res.data
        return data.message
    } catch (error) {
        await api.patch(`/cliente/${id}`, backup.cliente)
        await api.patch(`/contato-cliente/${id}`, backup.contato)
        const errorMessage = error.response && error.response.data.message
        if (errorMessage) return errorMessage
        return
    }
}

const cliente = create(set => ({
    message: '',

    allRight: false,

    createCliente: async (client) => {
        try {
            const canPost = await verifyDatas(client)
            if (!canPost) {
                set(() => ({ message: errorMsg }))
                errorMsg = ''
                return
            }

            const { msg, id_cliente } = await addClient(client)

            //caso o cliente seja inserido com sucesso - start
            if (msg === 'Cliente inserido no sistema com sucesso!') {
                client = {
                    ...client,
                    id_cliente,
                    id_associado: id_cliente
                }

                set(() => ({ message: msg }))

                const { msgContact, id_contact } = await addClientContact(client)

                //caso o contato do cliente seja inserido com sucesso - start
                if (msgContact === 'Contato do cliente inserido no sistema com sucesso!') {
                    const { msgContract, id_contract } = await addClientContract(client, id_contact)

                    //caso o contrato do cliente seja inserido com sucesso - start
                    if (msgContract === 'Contrato inserido no sistema com sucesso!') set(() => ({ allRight: true }))

                    else {
                        set(() => ({ message: '' }))
                        if (typeof msgContract === 'string'
                            && msgContract !== 'Contrato inserido no sistema com sucesso!'
                            && msgContract !== 'Houve um erro no servidor, tente novamente!') set(() => ({ message: msgContract }))
                        else alert('Erro no servidor, tente novamente!')
                    }
                }//caso o contato do cliente seja inserido com sucesso - end

                else {
                    set(() => ({ message: '' }))
                    if (typeof msgContact === 'string'
                        && msgContact !== 'Contato do cliente inserido no sistema com sucesso!'
                        && msgContact !== 'Houve um erro no servidor, temte novamente!') set(() => ({ message: msgContact }))
                    else alert('Erro no servidor, tente novamente!')
                }
            }//caso o cliente seja inserido com sucesso - end

            else if (typeof msg === 'string'
                && msg !== 'Cliente inserido no sistema com sucesso!'
                && msg !== 'Houve um erro no servidor, tente novamente!') set(() => ({ message: msg }))
            else alert('Erro no servidor, tente novamente!')
        } catch (error) {
            console.log(error)
        }
    },

    editCliente: async (client, backup, id) => {
        try {
            const msg = await editClient(client, id)

            //caso o cliente seja atualizado com sucesso - start
            if (msg === 'Cliente atualizado com sucesso!') {
                set(() => ({ message: msg }))

                const msgContact = await editClientContact(client, backup, id)

                //caso o contato do cliente seja atualizado com sucesso - start
                if (msgContact === 'Contato do cliente atualizado com sucesso!') {
                    const msgContract = await editClientContract(client, backup, id)

                    //caso o contrato do cliente seja atualizado com sucesso - start
                    if (msgContract === 'Contrato atualizado com sucesso!') set(() => ({ allRight: true }))

                    else {
                        set(() => ({ message: '' }))
                        alert('Erro no servidor, tente novamente!')
                    }
                }//caso o contato do cliente seja atualizado com sucesso - end

                else {
                    set(() => ({ message: '' }))
                    alert('Erro no servidor, tente novamente!')
                }
            }//caso o cliente seja atualizado com sucesso - end

            else alert('Erro no servidor, tente novamente!')
        } catch (error) {
            console.log(error)
        }
    },

    cleanMessage: () => set(() => ({ message: '' })),

    cleanAllRight: () => set(() => ({ allRight: false }))
}))

export default cliente