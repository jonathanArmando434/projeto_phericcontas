import { useState } from 'react'
import api from '../../axios/api'

import './AddTask.css'

import Index from "./Index"

import AdminModal from '/src/components/admin/AdminModal'
import PageTitle from '../../components/admin/PageTitle'
//import { open, setOpen, about, setAbout, FormTask } from '../../components/admin/FormTask'

const AddTask = () => {
    let [open, setOpen] = useState(false)
    let [about, setAbout] = useState('')
    const [servico, setServico] = useState('Organização contabilística')
    const [data_limite, setDataLimite] = useState('')
    const [id_responsavel, setIdResponsavel] = useState('')
    const [id_cliente, setIdCliente] = useState('')
    const [valor, setValor] = useState(0)
    const [message, setMessage] = useState('')
    const [allRight, setAllRight] = useState(false)

    const addTask = async (task) => {
        const api_url = import.meta.env.VITE_API_URL

        const res = await api.post(api_url + '/tarefa', task)
        const data = res.data

        return data.message
    }

    const cleanDatas = () => {
        setServico('Organização contabilística')
        setDataLimite('')
        setIdResponsavel('')
        setIdCliente('')
        setValor(0)
        setMessage('')
    }

    const verifyDatas = () => {
        if(!servico){
            setMessage('Preencha o campo do serviço')
            return false
        }
        if(!valor){
            setMessage('Preencha o campo do valor')
            return false
        }
        if(!data_limite){
            setMessage('Preencha o campo da data limite')
            return false
        }
        if(!id_responsavel){
            setMessage('Seleciona um responsável pela tarefa')
            return false
        }
        if(!id_cliente){
            setMessage('Seleciona o cliente associado ao serviço')
            return false
        }
        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault(e)

        const task = {
            servico,
            valor,
            data_limite,
            id_responsavel,
            id_cliente,
        }

        const canPost = await verifyDatas()

        if(!canPost) return

        const msg = await addTask(task)

        if (msg === 'Tarefa inserida no sistema com sucesso!') {
            setMessage(msg)
            setAllRight(true)
            cleanDatas()
        } else alert('Houve um erro, tente novamente!')
    }

    return (
        <Index>
            <main className="admin admin-content">
                <div className="admin-container-fluid admin-p-0">
                    <div className="admin-row">
                        <PageTitle title={'Nova tarefa'} />

                        <div className="admin-col-12 admin-col-lg-6 admin-bg-fff admin-br-5 admin-mx-auto div-form">
                            <form className="form-new" onSubmit={handleSubmit}>
                                {message && <div className={(allRight ? 'admin-msg-success' : 'admin-msg-danger')}>
                                    {message}
                                </div>}
                                <label htmlFor="service">Serviço</label>
                                <select id="service" name="service" className="admin-form-select admin-mb-3" defaultValue={servico} onChange={e => setServico(e.target.value)}>
                                    <option value={'Organização contabilística'}>Organização contabilística</option>
                                    <option value={'Constituição e legalização de empresa'}>Constituição e legalização de empresa</option>
                                    <option value={'Consultoria fiscal'}>Consultoria fiscal</option>
                                    <option value={'Gestão de recursos humanos'}>Gestão de recursos humanos</option>
                                </select>
                                <label htmlFor="data-inicio">Valor</label>
                                <input
                                    type="number"
                                    min={50}
                                    className="admin-form-control admin-mb-3"
                                    id="valor"
                                    name="valor"
                                    placeholder='Informe o preço'
                                    value={valor || ''}
                                    onChange={e => setValor(e.target.value)}
                                />
                                <label htmlFor="data-limite">Data Limite</label>
                                <input
                                    type="date"
                                    className="admin-form-control admin-mb-3"
                                    id="data-limite"
                                    name="dataLimite"
                                    placeholder=""
                                    value={data_limite || ''}
                                    onChange={e => setDataLimite(e.target.value)}
                                />
                                <label htmlFor="func-res" className="admin-d-block">Funcionário Responsável</label>
                                <input
                                    className="admin-form-control admin-mb-3 admin-w-me-80 admin-d-inline-block"
                                    type="text"
                                    placeholder="Seleciona um funcionário"
                                    id="func-res"
                                    name="func-res"
                                    readOnly
                                />
                                <button
                                    onClick={() => {
                                        setOpen(!open)
                                        setAbout('Funcionário')
                                    }}
                                    type="button"
                                    id=""
                                    className="admin-btn-select admin-btn admin-btn-input admin-button-select"
                                >
                                    Selecionar
                                </button>
                                <label htmlFor="client" className="admin-d-block">
                                    Cliente
                                </label>
                                <input
                                    className="admin-form-control admin-mb-3 admin-w-me-80 admin-d-inline-block"
                                    type="text"
                                    placeholder="Seleciona o cliente"
                                    id="client"
                                    name="client"
                                    readOnly
                                />
                                <button
                                    onClick={() => {
                                        setOpen(!open)
                                        setAbout('Cliente')
                                    }}
                                    type="button"
                                    id=""
                                    className="admin-btn-select admin-btn admin-btn-input admin-button-select"
                                >
                                    Selecionar
                                </button>
                                <button type="submit" className="admin-btn admin-main-btn admin-form-control">
                                    Adicionar
                                </button>
                            </form>
                        </div>
                        {/* The Modal */}
                        <AdminModal open={open} setOpen={setOpen} about={about} setAbout={setAbout} setIdResponsavel={setIdResponsavel} setIdCliente={setIdCliente} />
                    </div>
                </div>
            </main>
        </Index>
    )
}

export default AddTask