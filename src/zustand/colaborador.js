import { create } from "zustand";
import api from "../axios/api";

const addMember = async (member) => {
    try {
        const res = await api.post('/colaborador', member)
        const data = res.data
        return { msg: data.message, id_colaborador: data.result._id || '' }
    } catch (error) {
        const errorMessage = error.response && error.response.data.message
        if (errorMessage) return { msg: errorMessage }
        return {}
    }
}

const addMemberContact = async (member) => {
    try {
        const res = await api.post('/contato-colaborador', member)
        const data = res.data
        return { msgContact: data.message || '', id_contact: data.result._id || '' }
    } catch (error) {
        console.log(error)
        await api.delete(`/colaborador/${member.id_colaborador}`)
        const errorMessage = error.response && error.response.data.message
        if (errorMessage) return { msgContact: errorMessage }
        return {}
    }
}

const addMemberContract = async (member, id_contact) => {
    try {
        let res = await api.post('/contrato', member)
        const data = res.data
        return data.message
    } catch (error) {
        await api.delete(`/colaborador/${member.id_colaborador}`)
        await api.delete(`/contato-colaborador/${id_contact}`)
        const errorMessage = error.response && error.response.data.message
        if (errorMessage) return errorMessage
        return
    }
}

const editMember = async (member, id) => {
    try {
        const res = await api.patch(`/colaborador/${id}`, member)
        const data = res.data
        return { msg: data.message, id_colaborador: data.result._id || '' }
    } catch (error) {
        const errorMessage = error.response && error.response.data.message
        if (errorMessage) return { msg: errorMessage }
        return {}
    }
}

const editMemberContact = async (member, backup, id) => {
    try {
        const res = await api.patch(`/contato-colaborador/${id}`, member)
        const data = res.data
        console.log(data + ' *** data aqui')
        return { msgContact: data.message || '', id_contact: data.result._id || '' }
    } catch (error) {
        console.log(error)
        await api.patch(`/colaborador/${id}`, backup.colaborador)
        const errorMessage = error.response && error.response.data.message
        if (errorMessage) return { msgContact: errorMessage }
        return {}
    }
}

const editMemberContract = async (member, backup, id) => {
    try {
        let res = await api.patch(`/contrato/${id}`, member)
        const data = res.data
        return data.message
    } catch (error) {
        await api.patch(`/colaborador/${id}`, backup.colaborador)
        await api.patch(`/contato-colaborador/${id}`, backup.contato)
        const errorMessage = error.response && error.response.data.message
        if (errorMessage) return errorMessage
        return
    }
}

const colaborador = create(set => ({
    message: '',

    allRight: false,

    createColaborador: async (member) => {
        try {
            const { msg, id_colaborador } = await addMember(member)

            //caso o colaborador seja inserido com sucesso - start
            if (msg === 'Colaborador inserido no sistema com sucesso!') {
                member = {
                    ...member,
                    id_colaborador,
                    id_associado: id_colaborador
                }

                set(() => ({ message: msg }))

                const { msgContact, id_contact } = await addMemberContact(member)

                //caso o contato do colaborador seja inserido com sucesso - start
                if (msgContact === 'Contato do Colaborador inserido no sistema com sucesso!') {
                    const msgContract = await addMemberContract(member, id_contact)

                    //caso o contrato do colaborador seja inserido com sucesso - start
                    if (msgContract === 'Contrato inserido no sistema com sucesso!') set(() => ({ allRight: true }))

                    else {
                        set(() => ({ message: '' }))
                        if (typeof msgContract === 'string'
                            && msgContract !== 'Contrato inserido no sistema com sucesso!'
                            && msgContract !== 'Houve um erro no servidor, tente novamente!') set(() => ({ message: msgContract }))
                        else alert('Erro no servidor, tente novamente!')
                    }
                }//caso o contato do colaborador seja inserido com sucesso - end

                else {
                    set(() => ({ message: '' }))
                    if (typeof msgContact === 'string'
                        && msgContact !== 'Contato do Colaborador inserido no sistema com sucesso!'
                        && msgContact !== 'Houve um erro no servidor, temte novamente!') set(() => ({ message: msgContact }))
                    else alert('Erro no servidor, tente novamente!')
                }
            }//caso o colaborador seja inserido com sucesso - end

            else if (typeof msg === 'string'
                && msg !== 'Colaborador inserido no sistema com sucesso!'
                && msg !== 'Houve um erro no servidor, tente novamente!') set(() => ({ message: msg }))
            else alert('Erro no servidor, tente novamente!')
        } catch (error) {
            console.log(error)
        }
    },

    editColaborador: async (member, backup, id) => {
        try {
            const { msg } = await editMember(member, id)

            //caso o colaborador seja atualizado com sucesso - start
            if (msg === 'Colaborador atualizado com sucesso!') {
                set(() => ({ message: msg }))

                const { msgContact } = await editMemberContact(member, backup, id)
                console.log(msgContact)

                //caso o contato do colaborador seja atualizado com sucesso - start
                if (msgContact === 'Contato do colaborador atualizado com sucesso!') {
                    const msgContract = await editMemberContract(member, backup, id)

                    //caso o contrato do colaborador seja atualizado com sucesso - start
                    if (msgContract === 'Contrato atualizado com sucesso!') set(() => ({ allRight: true }))

                    else {
                        set(() => ({ message: '' }))
                        alert('Erro no servidor, tente novamente!')
                    }
                }//caso o contato do colaborador seja atualizado com sucesso - end

                else {
                    set(() => ({ message: '' }))
                    alert('Erro no servidor, tente novamente!')
                }
            }//caso o colaborador seja atualizado com sucesso - end

            else alert('Erro no servidor, tente novamente!')
        } catch (error) {
            console.log(error)
        }
    },

    cleanMessage: () => set(() => ({ message: '' })),

    cleanAllRight: () => set(() => ({ allRight: false }))
}))

export default colaborador