import { create } from "zustand";
import api from "../axios/api";

const addOrEditMember = async (member, method, id) => {
    try {
        let res
        if (method === 'post') res = await api.post('/colaborador', member)
        else if (method === 'patch') res = await api.patch(`/colaborador/${id}`, member)
        const data = res.data
        return { msg: data.message, id_colaborador: data.result._id || '' }
    } catch (error) {
        const errorMessage = error.response && error.response.data.message
        if (errorMessage) return { msg: errorMessage }
        return {}
    }
}

const addOrEditMemberContact = async (member, method, id) => {
    try {
        let res
        if (method === 'post') res = await api.post('/contato-colaborador', member)
        else if (method === 'patch') res = api.patch(`/contato-colaborador/${id}`, member)
        const data = res.data
        return { msgContact: data.message, id_contact: data.result._id || '' }
    } catch (error) {
        console.log(error)
        await api.delete(`/colaborador/${member.id_colaborador}`)
        const errorMessage = error.response && error.response.data.message
        if (errorMessage) return { msgContact: errorMessage }
        return {}
    }
}

const addOrEditMemberContract = async (member, id_contact, method, id) => {
    try {
        let res
        if (method === 'post') res = await api.post('/contrato', member)
        else if (method === 'patch') res = await api.post(`/contrato/${id}`, member)
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

const colaborador = create(set => ({
    message: '',

    allRight: false,

    createColaborador: async (member, method, id) => {
        try {
            const { msg, id_colaborador } = await addOrEditMember(member, method, id)

            //caso o colaborador seja inserido com sucesso - start
            if (msg === 'Colaborador inserido no sistema com sucesso!') {
                member = {
                    ...member,
                    id_colaborador,
                    id_associado: id_colaborador
                }

                set(() => ({ message: msg }))

                const { msgContact, id_contact } = await addOrEditMemberContact(member, method, id)

                //caso o contato do colaborador seja inserido com sucesso - start
                if (msgContact === 'Contato do Colaborador inserido no sistema com sucesso!') {
                    const msgContract = await addOrEditMemberContract(member, id_contact, method, id)

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

    cleanMessage: () => set(() => ({ message: '' })),

    cleanAllRight: () => set(() => ({ allRight: false }))
}))

export default colaborador