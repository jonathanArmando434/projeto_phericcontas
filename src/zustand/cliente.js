import { create } from "zustand";
import api from "../axios/api";

const getLocal = async () => {
    const res = await api.get('/localizacao')
    return res.data
}

const deleteLocal = async (localIDs) => {
    await localIDs.forEach(id => api.delete(`/localizacao/${id}`))
}

const redoPosts = async (client, id_contact, id_contract, localIDs) => {
    await api.delete(`/cliente/${client.id_cliente}`)
    await api.delete(`/contato-cliente/${id_contact}`)
    await api.delete(`/contrato/${id_contract}`)
    if (localIDs.length > 0) await deleteLocal(localIDs)
}

const reupdateLocal = async (localIDs, local) => {
    for (i in localIDs)
        await api.patch(`/localizacao/${localIDs[i]}`, local[i])
}

const addClient = async (client) => {
    try {
        const res = await api.post('/cliente', client)
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

const addClientLocalization = async (client, id_contact, id_contract) => {
    const localIDs = []
    try {
        const localizacao = client.localizacao

        if (localizacao.length === 0){
            await redoPosts(client, id_contact, id_contract, localIDs)
            return
        }

        localizacao.forEach(async value => {
            console.log(value)
            const auxLocal = {
                ...value,
                id_cliente: client.id_cliente
            }
            const res = await api.post('/localizacao', auxLocal)
            localIDs.push(res.data.result._id)
        })

        return 'Localização inserida no sistema com sucesso!'
    } catch (error) {
        await redoPosts(client, id_contact, id_contract, localIDs)
        const errorMessage = error.response && error.response.data.message
        if (errorMessage) return errorMessage
        return
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
        console.log(data + ' *** data aqui')
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

const editClientLocalization = async (client, backup, id) => {
    const localUpdatedIDs = []
    const localNewIDs = []

    const backupLocal = await getLocal()

    try {
        const local = [...client.localizacao]

        for (i in local) {
            const res = await api.patch(`/localizacao/${backupLocal[i]._id}`, local[i])
            localUpdatedIDs.push(res.data.result._id)
        }

        if (backupLocal.length < local.length)
            for (let i = backupLocal.length; i < local.length; i++) {
                const auxLocal = {
                    ...local[i],
                    id_Cliente: client.id_Cliente
                }
                const res = await api.post('/localizacao', local[i])
                localNewIDs.push(res.data.result._id)
            }

        return 'Localização atualizada com sucesso!'
    } catch (error) {
        await api.patch(`/cliente/${id}`, backup.cliente)
        await api.patch(`/contato-cliente/${id}`, backup.contato)
        await api.patch(`/contrato/${id}`, backup.contrato)
        if (localUpdatedIDs.length > 0) await reupdateLocal(localUpdatedIDs, backupLocal)
        if (localNewIDs.length > 0) await reupdateLocal(localNewIDs)
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
                    if (msgContract === 'Contrato inserido no sistema com sucesso!') {
                        const msgLocalization = await addClientLocalization(client, id_contact, id_contract)

                        if (msgLocalization === 'Localização inserida no sistema com sucesso!') set(() => ({ allRight: true }))

                        else {
                            console.log('chegou')
                            set(() => ({ message: '' }))
                            if (typeof msgLocalization === 'string'
                                && msgLocalization !== 'Localização inserida no sistema com sucesso!'
                                && msgLocalization !== 'Houve um erro no sistema, tente novamente!') set(() => ({ message: msgLocalization }))
                            else alert('Erro no servidor, tente novamente!')
                        }
                    }

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
                console.log(msgContact)

                //caso o contato do cliente seja atualizado com sucesso - start
                if (msgContact === 'Contato do cliente atualizado com sucesso!') {
                    const msgContract = await editClientContract(client, backup, id)

                    //caso o contrato do cliente seja atualizado com sucesso - start
                    if (msgContract === 'Contrato atualizado com sucesso!') {
                        const msgLocalization = await editClientLocalization(client, backup, id)

                        if (msgLocalization === 'Localização atualizada com sucesso!') set(() => ({ allRight: true }))

                        else {
                            set(() => ({ message: '' }))
                            alert('Erro no servidor, tente novamente!')
                        }
                    }

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