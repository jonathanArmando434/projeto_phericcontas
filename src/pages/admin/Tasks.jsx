import React from 'react'
import { Link } from 'react-router-dom'
import { BiEdit } from 'react-icons/bi'
import { TbClipboardPlus } from 'react-icons/tb'
import { AiOutlineCloseSquare, AiOutlineCheckSquare } from 'react-icons/ai'
import { useState, useEffect } from 'react'
import api from '../../axios/api'
import moment from 'moment'
import loginZustand from '../../zustand/login'

import PageTitle from '../../components/admin/PageTitle'
import MinLoading from '../../components/admin/MinLoading'

const Tasks = () => {
    const [active, setActive] = useState('all')
    const [tasks, setTasks] = useState([])
    const [responsavel, setResponsavel] = useState([])
    const [cliente, setCliente] = useState([])

    const [loading, setLoading] = useState(true)

    const addFinanca = async (task) => {
        const dado = {
            desc: task.servico,
            valor: task.valor,
            tipo: 'Entrada'
        }

        await api.post('/financas', dado)
    }

    const finishTask = async (id, task) => {
        try {
            setLoading(true)
            task.status = 'Finalizado'
          //  task.data_limite = moment(task.data_limite, 'DD/MM/YYYY').format('YYYY-MM-DD')
            const data_fim = new Date()
            const updatedDatas = { ...task, data_fim }
            await api.patch(`/tarefa/${id}`, updatedDatas)

            updatedDatas.data_fim = data_fim.toLocaleDateString()
            const aux = tasks.map(value => {
                if (value._id === id) {
                    addFinanca(value)
                }
                return value
            })
            setTasks(aux)
        } catch (error) {
            console.log(error)
            alert('Houve um erro, tente novamente!')
        } finally {
            setLoading(false)
        }
    }

    const cancelTask = async (id, task) => {
        try {
            setLoading(true)
            task.status = 'Cancelado'
            task.data_limite = moment(task.data_limite, 'DD/MM/YYYY').format('YYYY-MM-DD')
            await api.patch(`/tarefa/${id}`, task)
            const aux = tasks.map(value => {
                if (value.id === id) return task
                return value
            })
            setTasks(aux)
        } catch (error) {
            alert('Houve um erro, tente novamente!')
        } finally {
            setLoading(false)
        }
    }

    const getMember = async () => {
        const res = await api.get('/colaborador')
        const dado = res.data
        setResponsavel(dado)
    }

    const getClient = async () => {
        const res = await api.get('/cliente')
        const dado = res.data
        setCliente(dado)
    }
    let i = 0

    const getResponsavelName = (task) => {
        let colaborador
        responsavel.forEach(res => {
            if (task.id_responsavel === res._id) colaborador = res.nome
        })
        return colaborador
    }

    const getClientName = (task) => {
        let client
        cliente.forEach(cli => {
            if (task.id_cliente === cli._id) client = cli.nome
        })
        return client
    }

    const getDates = (task) => {
        task.data_inicio = (new Date(task.data_inicio?.split('T')[0]).toLocaleDateString())
        task.data_limite = (new Date(task.data_limite?.split('T')[0]).toLocaleDateString())
        task.data_fim = (task.status === 'Finalizado' ? (new Date(task.data_fim?.split('T')[0]).toLocaleDateString()) : '')
        return task
    }

    const getTasks = async (id) => {
        const res = await api.get('/tarefa')
        const dados = res.data

        if (dados) {
            const auxDados = await dados.map(value => getDates(value))
            setTasks(auxDados)
        }
    }

    useEffect(() => {
        try {
            getMember()
            getClient()
            getTasks()
        } finally {
            setLoading(false)
        }
    }, [])

    return (
        <main className="admin-content">
            <div className="admin-container-fluid admin-p-0">
                <div className="admin-row">
                    <PageTitle title={'Lista de tarefas'} btnText={'Adicionar Tarefa'} BtnIcon={TbClipboardPlus} link={true} path={"/admin/tarefa/adicionar"} />

                    {loading ? <MinLoading /> : (
                        <>
                            <div className="admin-col-12 admin-d-flex admin-my-5 admin-menu-list">
                                <a onClick={() => setActive('all')} className={active === 'all' ? "admin-btn admin-btn-nav admin-mx-3 active" : "admin-btn admin-btn-nav admin-mx-3"} >Todos</a>
                                <a onClick={() => setActive('done')} className={active === 'done' ? "admin-btn admin-btn-nav admin-mx-3 active" : "admin-btn admin-btn-nav admin-mx-3"}>Finalisados</a>
                                <a onClick={() => setActive('in-progress')} className={active === 'in-progress' ? "admin-btn admin-btn-nav admin-mx-3 active" : "admin-btn admin-btn-nav admin-mx-3"}>Em Progresso</a>
                                <a onClick={() => setActive('canceled')} className={active === 'canceled' ? "admin-btn admin-btn-nav admin-mx-3 active" : "admin-btn admin-btn-nav admin-mx-3"}>Cancelados</a>
                            </div>
                            <div className="admin-col-12 admin-d-flex">
                                <div className="admin-card admin-flex-fill admin-bg-fff">
                                    <table style={{ backgroundColor: '#fff' }} className="admin-table admin-table-hover admin-my-0 admin-white">
                                        <thead>
                                            <tr>
                                                <th>Serviço</th>
                                                <th className="admin-d-none admin-d-xl-table-cell">Data de Início</th>
                                                <th className="admin-d-none admin-d-xl-table-cell">Data Limite</th>
                                                <th className="admin-d-none admin-d-xl-table-cell">
                                                    Data de Finalização
                                                </th>
                                                <th>Estado</th>
                                                <th className="admin-d-none admin-d-md-table-cell">
                                                    Funcionário Responsável
                                                </th>
                                                <th className="admin-d-none admin-d-md-table-cell">Cliente</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                tasks.length > 0 && (
                                                    tasks.map((task) => {
                                                        if (active === 'all') return (
                                                            <tr key={task._id}>
                                                                <td>{task.servico}</td>
                                                                <td className="admin-d-none admin-d-xl-table-cell">{task.data_inicio}</td>
                                                                <td className="admin-d-none admin-d-xl-table-cell">{task.data_limite}</td>
                                                                <td className="admin-d-none admin-d-xl-table-cell">{task.data_fim || '...'}</td>
                                                                <td>
                                                                    <span className={
                                                                        (task.status === 'Finalizado'
                                                                            ? "admin-badge admin-status-success"
                                                                            : task.status === 'Cancelado'
                                                                                ? "admin-badge admin-status-danger"
                                                                                : 'admin-badge admin-status-info'
                                                                        )}>
                                                                        {task.status || 'status'}
                                                                    </span>
                                                                </td>
                                                                <td className="admin-d-none admin-d-md-table-cell">{getResponsavelName(task)}</td>
                                                                <td className="admin-d-none admin-d-md-table-cell">{getClientName(task)}</td>
                                                                <td className="admin-d-none admin-d-md-table-cell">
                                                                    <a onClick={() => finishTask(task._id, task)} className="admin-tab-done">
                                                                        <AiOutlineCheckSquare />
                                                                    </a>
                                                                    <a onClick={() => cancelTask(task._id, task)} className="admin-tab-cancel">
                                                                        <AiOutlineCloseSquare />
                                                                    </a>
                                                                    <Link to={'/admin/tarefa/editar/' + task._id} className="admin-tab-edit">
                                                                        <BiEdit />
                                                                    </Link>
                                                                </td>
                                                            </tr>
                                                        )

                                                        else if (active === 'done' && task.status === 'Finalizado') return (
                                                            <tr key={task._id}>
                                                                <td>{task.servico}</td>
                                                                <td className="admin-d-none admin-d-xl-table-cell">{task.data_inicio}</td>
                                                                <td className="admin-d-none admin-d-xl-table-cell">{task.data_limite}</td>
                                                                <td className="admin-d-none admin-d-xl-table-cell">{task.data_fim || '...'}</td>
                                                                <td>
                                                                    <span className={
                                                                        (task.status === 'Finalizado'
                                                                            ? "admin-badge admin-status-success"
                                                                            : task.status === 'Cancelado'
                                                                                ? "admin-badge admin-status-danger"
                                                                                : 'admin-badge admin-status-info'
                                                                        )}>
                                                                        {task.status || 'status'}
                                                                    </span>
                                                                </td>
                                                                <td className="admin-d-none admin-d-md-table-cell">{getResponsavelName(task)}</td>
                                                                <td className="admin-d-none admin-d-md-table-cell">{getClientName(task)}</td>
                                                                <td className="admin-d-none admin-d-md-table-cell">
                                                                    <a onClick={() => finishTask(task._id, task)} className="admin-tab-done">
                                                                        <AiOutlineCheckSquare />
                                                                    </a>
                                                                    <a onClick={() => cancelTask(task._id, task)} className="admin-tab-cancel">
                                                                        <AiOutlineCloseSquare />
                                                                    </a>
                                                                    <Link to={'/admin/tarefa/editar/' + task._id} className="admin-tab-edit">
                                                                        <BiEdit />
                                                                    </Link>
                                                                </td>
                                                            </tr>
                                                        )

                                                        else if (active === 'in-progress' && task.status === 'Em progresso') return (
                                                            <tr key={task._id}>
                                                                <td>{task.servico}</td>
                                                                <td className="admin-d-none admin-d-xl-table-cell">{task.data_inicio}</td>
                                                                <td className="admin-d-none admin-d-xl-table-cell">{task.data_limite}</td>
                                                                <td className="admin-d-none admin-d-xl-table-cell">{task.data_fim || '...'}</td>
                                                                <td>
                                                                    <span className={
                                                                        (task.status === 'Finalizado'
                                                                            ? "admin-badge admin-status-success"
                                                                            : task.status === 'Cancelado'
                                                                                ? "admin-badge admin-status-danger"
                                                                                : 'admin-badge admin-status-info'
                                                                        )}>
                                                                        {task.status || 'status'}
                                                                    </span>
                                                                </td>
                                                                <td className="admin-d-none admin-d-md-table-cell">{getResponsavelName(task)}</td>
                                                                <td className="admin-d-none admin-d-md-table-cell">{getClientName(task)}</td>
                                                                <td className="admin-d-none admin-d-md-table-cell">
                                                                    <a onClick={() => finishTask(task._id, task)} className="admin-tab-done">
                                                                        <AiOutlineCheckSquare />
                                                                    </a>
                                                                    <a onClick={() => cancelTask(task._id, task)} className="admin-tab-cancel">
                                                                        <AiOutlineCloseSquare />
                                                                    </a>
                                                                    <Link to={'/admin/tarefa/editar/' + task._id} className="admin-tab-edit">
                                                                        <BiEdit />
                                                                    </Link>
                                                                </td>
                                                            </tr>
                                                        )

                                                        else if (active === 'canceled' && task.status === 'Cancelado') return (
                                                            <tr key={task._id}>
                                                                <td>{task.servico}</td>
                                                                <td className="admin-d-none admin-d-xl-table-cell">{task.data_inicio}</td>
                                                                <td className="admin-d-none admin-d-xl-table-cell">{task.data_limite}</td>
                                                                <td className="admin-d-none admin-d-xl-table-cell">{task.data_fim || '...'}</td>
                                                                <td>
                                                                    <span className={
                                                                        (task.status === 'Finalizado'
                                                                            ? "admin-badge admin-status-success"
                                                                            : task.status === 'Cancelado'
                                                                                ? "admin-badge admin-status-danger"
                                                                                : 'admin-badge admin-status-info'
                                                                        )}>
                                                                        {task.status || 'status'}
                                                                    </span>
                                                                </td>
                                                                <td className="admin-d-none admin-d-md-table-cell">{getResponsavelName(task)}</td>
                                                                <td className="admin-d-none admin-d-md-table-cell">{getClientName(task)}</td>
                                                                <td className="admin-d-none admin-d-md-table-cell">
                                                                    <a onClick={() => finishTask(task._id, task)} className="admin-tab-done">
                                                                        <AiOutlineCheckSquare />
                                                                    </a>
                                                                    <a onClick={() => cancelTask(task._id, task)} className="admin-tab-cancel">
                                                                        <AiOutlineCloseSquare />
                                                                    </a>
                                                                    <Link to={'/admin/tarefa/editar/' + task._id} className="admin-tab-edit">
                                                                        <BiEdit />
                                                                    </Link>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </main>
    )
}

export default Tasks