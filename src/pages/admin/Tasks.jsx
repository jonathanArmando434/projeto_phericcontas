import React from 'react'
import { Link } from 'react-router-dom'
import { BiEdit } from 'react-icons/bi'
import { TbClipboardPlus } from 'react-icons/tb'
import { useState, useEffect } from 'react'
import api from '../../axios/api'
import moment from 'moment'

import PageTitle from '../../components/admin/PageTitle'

const Tasks = () => {
    const [active, setActive] = useState('all')
    const [tasks, setTasks] = useState([])
    const [responsavel, setResponsavel] = useState([])
    const [cliente, setCliente] = useState([])

    const finishTask = async (id, task) => {
        try {
            task.status = 'Finalizado'
            task.data_limite = moment(task.data_limite, 'DD/MM/YYYY').format('YYYY-MM-DD')
            const data_fim = new Date()
            const updatedDatas = { ...task, data_fim }
            await api.patch(`/tarefa/${id}`, updatedDatas)

            updatedDatas.data_fim = data_fim.toLocaleDateString()
            const aux = tasks.map(value => {
                if (value._id === id) return updatedDatas
                return value
            })
            setTasks(aux)
        } catch (error) {
            console.log(error)
            alert('Houve um erro, tente novamente!')
        }
    }

    const cancelTask = async (id, task) => {
        try {
            task.status = 'Cancelado'
            task.data_limite = moment(task.data_limite, 'DD/MM/YYYY').format('YYYY-MM-DD')
            console.timeLog(task)
            await api.patch(`/tarefa/${id}`, task)
            const aux = tasks.map(value => {
                if (value.id === id) return task
                return value
            })
            setTasks(aux)
        } catch (error) {
            alert('Houve um erro, tente novamente!')
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
            const auxDados = []

            const auxForMap = await dados.map(value => getDates(value))

            if (Array.isArray(auxForMap)) auxForMap.map(value => auxDados.unshift(value))

            setTasks(auxDados)
        }
    }

    useEffect(() => {
        getMember()
        getClient()
        getTasks()
    }, [])

    return (
        <main className="admin-content">
            <div className="admin-container-fluid admin-p-0">
                <div className="admin-row">
                    <PageTitle title={'Lista de tarefas'} btnText={'Adicionar Tarefa'} BtnIcon={TbClipboardPlus} link={true} path={"/admin/tarefa/adicionar"} />

                    <div className="admin-col-12 admin-d-flex admin-my-5 admin-menu-list">
                        <a onClick={() => setActive('all')} className={active === 'all' ? "admin-btn admin-btn-nav admin-mx-3 active" : "admin-btn admin-btn-nav admin-mx-3"} >Todos</a>
                        <a onClick={() => setActive('done')} className={active === 'done' ? "admin-btn admin-btn-nav admin-mx-3 active" : "admin-btn admin-btn-nav admin-mx-3"}>Finalisados</a>
                        <a onClick={() => setActive('in-progress')} className={active === 'in-progress' ? "admin-btn admin-btn-nav admin-mx-3 active" : "admin-btn admin-btn-nav admin-mx-3"}>Em Progresso</a>
                        <a onClick={() => setActive('canceled')} className={active === 'canceled' ? "admin-btn admin-btn-nav admin-mx-3 active" : "admin-btn admin-btn-nav admin-mx-3"}>Cancelados</a>
                    </div>
                    <div className="admin-col-12 admin-d-flex">
                        <div className="admin-card admin-flex-fill admin-bg-fff">
                            <table className="admin-table admin-table-hover admin-my-0">
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
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width={24}
                                                                    height={24}
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth={2}
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="admin-feather admin-feather-check-square admin-align-middle admin-me-2"
                                                                >
                                                                    <polyline points="9 11 12 14 22 4" />
                                                                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                                                                </svg>
                                                            </a>
                                                            <a onClick={() => cancelTask(task._id, task)} className="admin-tab-cancel">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width={24}
                                                                    height={24}
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth={2}
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="admin-feather admin-feather-x-square admin-align-middle admin-me-2"
                                                                >
                                                                    <rect
                                                                        x={3}
                                                                        y={3}
                                                                        width={18}
                                                                        height={18}
                                                                        rx={2}
                                                                        ry={2}
                                                                    />
                                                                    <line x1={9} y1={9} x2={15} y2={15} />
                                                                    <line x1={15} y1={9} x2={9} y2={15} />
                                                                </svg>
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
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width={24}
                                                                    height={24}
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth={2}
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="admin-feather admin-feather-check-square admin-align-middle admin-me-2"
                                                                >
                                                                    <polyline points="9 11 12 14 22 4" />
                                                                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                                                                </svg>
                                                            </a>
                                                            <a onClick={() => cancelTask(task._id, task)} className="admin-tab-cancel">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width={24}
                                                                    height={24}
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth={2}
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="admin-feather admin-feather-x-square admin-align-middle admin-me-2"
                                                                >
                                                                    <rect
                                                                        x={3}
                                                                        y={3}
                                                                        width={18}
                                                                        height={18}
                                                                        rx={2}
                                                                        ry={2}
                                                                    />
                                                                    <line x1={9} y1={9} x2={15} y2={15} />
                                                                    <line x1={15} y1={9} x2={9} y2={15} />
                                                                </svg>
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
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width={24}
                                                                    height={24}
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth={2}
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="admin-feather admin-feather-check-square admin-align-middle admin-me-2"
                                                                >
                                                                    <polyline points="9 11 12 14 22 4" />
                                                                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                                                                </svg>
                                                            </a>
                                                            <a onClick={() => cancelTask(task._id, task)} className="admin-tab-cancel">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width={24}
                                                                    height={24}
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth={2}
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="admin-feather admin-feather-x-square admin-align-middle admin-me-2"
                                                                >
                                                                    <rect
                                                                        x={3}
                                                                        y={3}
                                                                        width={18}
                                                                        height={18}
                                                                        rx={2}
                                                                        ry={2}
                                                                    />
                                                                    <line x1={9} y1={9} x2={15} y2={15} />
                                                                    <line x1={15} y1={9} x2={9} y2={15} />
                                                                </svg>
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
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width={24}
                                                                    height={24}
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth={2}
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="admin-feather admin-feather-check-square admin-align-middle admin-me-2"
                                                                >
                                                                    <polyline points="9 11 12 14 22 4" />
                                                                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                                                                </svg>
                                                            </a>
                                                            <a onClick={() => cancelTask(task._id, task)} className="admin-tab-cancel">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width={24}
                                                                    height={24}
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    strokeWidth={2}
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="admin-feather admin-feather-x-square admin-align-middle admin-me-2"
                                                                >
                                                                    <rect
                                                                        x={3}
                                                                        y={3}
                                                                        width={18}
                                                                        height={18}
                                                                        rx={2}
                                                                        ry={2}
                                                                    />
                                                                    <line x1={9} y1={9} x2={15} y2={15} />
                                                                    <line x1={15} y1={9} x2={9} y2={15} />
                                                                </svg>
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
                </div>
            </div>
        </main>
    )
}

export default Tasks