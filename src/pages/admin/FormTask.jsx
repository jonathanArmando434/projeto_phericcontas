import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { MdOutlineGroup } from 'react-icons/md'
import { FaRegHandshake } from 'react-icons/fa'
import api from '../../axios/api'
import loginZustand from '../../zustand/login'
import taskZustand from '../../zustand/task'

import './FormTask.css'

import AdminModal from '/src/components/admin/AdminModal'
import PageTitle from '../../components/admin/PageTitle'
import MinLoading from '../../components/admin/MinLoading'
import task from '../../zustand/task'

const FormTask = () => {
    const [servico, setServico] = useState('Organização contabilística')
    const [data_limite, setDataLimite] = useState('')
    const [valor, setValor] = useState(0)
    const [message, setMessage] = useState('')
    const [allRight, setAllRight] = useState(false)
    const [btn, setBtn] = useState('Adicionar')
    const [titlePage, setTitlePage] = useState('Adicionar tarefa')
    const [post, setPost] = useState(true)

    const { id } = useParams()

    const {
        open,
        setOpen,
        about,
        setAbout,
        id_responsavel,
        setIdResponsavel,
        id_cliente,
        setIdCliente,
        members,
        setMembers,
        clients,
        setClients
    } = taskZustand(state => state)

    const [ loading, setLoading ] = useState(true)

    const getResponsavelName = (task) => {
        let colaborador
        members.forEach(func => {
            if (id_responsavel === func._id) colaborador = func.nome
        })
        return colaborador
    }

    const getClientName = (task) => {
        let client
        clients.forEach(cli => {
            if (id_cliente === cli._id) client = cli.nome
        })
        return client
    }

    const addTask = async (task) => {
        const res = await api.post('/tarefa', task)
        const data = res.data

        return data.message
    }

    const editTask = async (task) => {
        console.log(task)
        const res = await api.patch(`/tarefa/${id}`, task)
        const data = res.data

        return data.message
    }

    const cleanDatas = () => {
        setServico('Organização contabilística')
        setDataLimite('')
        setIdResponsavel('')
        setIdCliente('')
        setValor(0)

        const auxMembers = members.map(value => {
            if (value.select === false) value.select = false
            return value
        })

        setMembers(auxMembers)

        const auxClients = clients.map(value => {
            if (value.select === false) value.select = false
            return value
        })

        setClients(auxClients)
    }

    const verifyDatas = () => {
        if (!id_cliente) {
            setMessage('Seleciona o cliente associado ao serviço')
            return false
        }
        if (!id_responsavel) {
            setMessage('Seleciona um responsável pela tarefa')
            return false
        }
        if (!servico) {
            setMessage('Preencha o campo do serviço')
            return false
        }
        if (!valor) {
            setMessage('Preencha o campo do valor')
            return false
        }
        if (!data_limite) {
            setMessage('Preencha o campo da data limite')
            return false
        }
        return true
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault(e)

            const task = {
                servico,
                valor,
                data_limite,
                id_responsavel,
                id_cliente,
            }

            const canPost = verifyDatas()

            if (!canPost) return

            setLoading(true)

            if (post) {
                const msg = await addTask(task)

                if (msg === 'Tarefa inserida no sistema com sucesso!') {
                    setMessage(msg)
                    setAllRight(true)
                    cleanDatas()
                } else alert('Houve um erro, tente novamente!')
            }
            else {
                const msg = await editTask(task)

                if (msg === 'Tarefa atualizada com sucesso!') {
                    setMessage(msg)
                    setAllRight(true)
                } else alert('Houve um erro, tente novamente!')
            }
        } finally {
            setLoading(false)
        }
    }

    const PreparingDatas = async () => {
        try {
            const resTarefa = await api.get(`/tarefa/${id}`)
            const tarefa = resTarefa.data

            setServico(tarefa.servico)
            setDataLimite(tarefa.data_limite)
            setIdResponsavel(tarefa.id_responsavel)
            setIdCliente(tarefa.id_cliente)
            setValor(tarefa.valor)
        } catch (error) {
            alert('Erro no servidor, recarregue a página!')
        }
    }

    useEffect(() => {
        try {
            setAllRight(false)
            setMessage('')

            if (id) {
                setBtn('Editar')
                setTitlePage('Editar tarefa')
                setPost(false)
                PreparingDatas()
            }
        } finally {
            setLoading(false)
        }
    }, [])

    return (
        <main className="admin admin-content">
            <div className="admin-container-fluid admin-p-0">
                <div className="admin-row">
                    <PageTitle title={titlePage} />

                    {loading ? (<MinLoading />) : (
                        <>
                            <div className="admin-col-12 admin-col-lg-6 admin-bg-fff admin-br-5 admin-mx-auto div-form admin-mt-4">
                                <form className="form-new" onSubmit={handleSubmit}>
                                    {message && <div className={(allRight ? 'admin-msg-success' : 'admin-msg-danger')}>
                                        {message}
                                    </div>}
                                    <label htmlFor="client" className="admin-d-block">
                                        Cliente
                                    </label>
                                    <input
                                        className="admin-form-control admin-mb-3 admin-w-me-80 admin-d-inline-block admin-input-associado"
                                        type="text"
                                        placeholder="Seleciona o cliente"
                                        value={getClientName(task) || ''}
                                        id="client"
                                        name="client"
                                        readOnly
                                    />
                                    <button
                                        onClick={() => {
                                            setOpen(!open)
                                            setAbout('cliente')
                                        }}
                                        type="button"
                                        id="btnSelectAssociate"
                                        className="admin-btn-select admin-btn admin-button-select"
                                    >
                                        <FaRegHandshake />
                                    </button>
                                    <label htmlFor="func-res" className="admin-d-block">Funcionário Responsável</label>
                                    <input
                                        className="admin-form-control admin-mb-3 admin-w-me-80 admin-d-inline-block admin-input-associado"
                                        type="text"
                                        placeholder="Seleciona um funcionário"
                                        value={getResponsavelName(task) || ''}
                                        id="func-res"
                                        name="func-res"
                                        readOnly
                                    />
                                    <button
                                        onClick={() => {
                                            setOpen(!open)
                                            setAbout('funcionário')
                                        }}
                                        type="button"
                                        id="btnSelectAssociate"
                                        className="admin-btn-select admin-btn admin-button-select"
                                    >
                                        <MdOutlineGroup />
                                    </button>
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
                                        value={data_limite.split('T')[0] || ''}
                                        onChange={e => setDataLimite(e.target.value)}
                                    />
                                    <button type="submit" className="admin-btn admin-main-btn admin-form-control admin-mt-3">
                                        {btn}
                                    </button>
                                </form>
                            </div>
                            {/* The Modal */}
                            <AdminModal />
                        </>
                    )}


                </div>
            </div>
        </main>
    )
}

export default FormTask